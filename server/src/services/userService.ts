import { compareSync } from "bcrypt";
import { Role, UserData } from "../types/userTypes";
import {
  InternalException,
  TooManyRequestsException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabaseStorage";
import { prismaClient } from "..";
import { mapPrismaRoleToCustomRole } from "../utils/mapRoleToCustomRole";
import { VerificationCodeType } from "@prisma/client";
import { fiveMinutesAgo, oneHourFromNow } from "../utils/date";
import { APP_ORIGIN } from "../secrets";
import { sendMail } from "../utils/sendMail";
import {
  getEmailResetTemplate,
  getPasswordResetTemplate,
} from "../utils/emailTemplates";
import { omitPassword } from "../utils/omitPassword";

interface UpdateUserData {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  profilePic?: ArrayBuffer | null;
}

export const updateUser = async (
  oldUserData: UserData,
  updateUserData: UpdateUserData,
  file: Express.Multer.File | undefined,
  fileBase64: ArrayBuffer | null
) => {
  if (updateUserData.password) {
    // Check if the old password is correct
    const isPasswordCorrect = compareSync(
      updateUserData.password,
      oldUserData.password
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        "Old password is incorrect",
        ErrorCode.UNAUTHORIZED
      );
    }
  }

  let imageUrl;

  if (file && fileBase64) {
    // Generate a unique name for the image using UUID
    const uniqueImageName = `${uuidv4()}-${file.originalname}`;

    const filePath = `users/${oldUserData.id}/profile/${uniqueImageName}`;

    // Upload profile picture to supabase storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, fileBase64, {
        contentType: file.mimetype,
      });

    if (error) {
      console.log("Error uploading image", error);
      throw new InternalException(
        "Failed to upload image to Supabase Storage",
        ErrorCode.UPLOAD_FAILED
      );
    }

    //get public url of the uploaded file
    const { data: image } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    imageUrl = image.publicUrl;
  }

  // Create an update object with only the defined properties
  const updateUser: Partial<UserData> = {
    ...updateUserData,
    ...(imageUrl && { profilePicUrl: imageUrl, customProfilePic: true }),
  };

  //exclude the role property from updateData object. Users will not be able to update their own role
  const { role, ...dataToUpdate } = updateUser;

  // Update the user in the database

  const updatedUser = await prismaClient.user.update({
    where: { id: oldUserData.id },
    data: dataToUpdate,
  });

  return updatedUser;
};

interface EmailChangeData {
  newEmail: string;
  password: string;
  userId: string | undefined;
}

export const sendEmailResetEmail = async ({
  newEmail,
  password,
  userId,
}: EmailChangeData) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException(
        "User not found",
        ErrorCode.USER_NOT_FOUND
      );
    }

    // validate password from the request

    if (!password) {
      throw new UnauthorizedException(
        "Password is required",
        ErrorCode.PASSWORD_REQUIRED
      );
    }

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException(
        "Invalid password",
        ErrorCode.INCORRECT_PASSWORD
      );
    }

    // check if the new email is already in use

    const existingUser = await prismaClient.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      throw new UnauthorizedException(
        "Email already in use",
        ErrorCode.EMAIL_ALREADY_IN_USE
      );
    }

    // check if email is the same as the current email

    if (newEmail === user.email) {
      throw new UnauthorizedException(
        "Email is the same as the current email",
        ErrorCode.EMAIL_SAME_AS_CURRENT
      );
    }

    // check email rate limit

    const fiveMinAgo = fiveMinutesAgo();

    const count = await prismaClient.verificationCode.count({
      where: {
        userId: user.id,
        type: VerificationCodeType.EMAIL_UPDATE,
        createdAt: { gte: fiveMinAgo },
      },
    });

    if (!(count <= 1)) {
      throw new TooManyRequestsException(
        "Too many requests, please try again later",
        ErrorCode.TOO_MANY_REQUESTS
      );
    }

    // create a verification code

    const expiresAt = oneHourFromNow();

    const verificationCode = await prismaClient.verificationCode.create({
      data: {
        userId: user.id,
        type: VerificationCodeType.EMAIL_UPDATE,
        expiresAt,
        newEmail: newEmail,
      },
    });

    // send verification email

    const url = `${APP_ORIGIN}/email/reset?code=${
      verificationCode.id
    }&exp=${expiresAt.getTime()}`;

    const { data, error } = await sendMail({
      to: newEmail,
      ...getEmailResetTemplate(url, user.email, newEmail),
    });

    if (!data?.id) {
      throw new InternalException(
        `${error?.name} - ${error?.message}`,
        ErrorCode.INTERNALEXCEPTION
      );
    }
    // return success message
    return { url, emailId: data.id };
  } catch (error: any) {
    console.log("SendEmailResetEmailError:", error.message);
    return {};
  }
};

export const resetEmail = async (verificationCode: string) => {
  const validEmailUpdateCode = await prismaClient.verificationCode.findFirst({
    where: {
      id: verificationCode,
      type: VerificationCodeType.EMAIL_UPDATE,
      expiresAt: { gt: new Date() },
    },
  });

  if (!validEmailUpdateCode) {
    throw new UnauthorizedException(
      "Invalid verification code",
      ErrorCode.INVALID_VERIFICATION_CODE
    );
  }

  // update the user's email

  const newEmail = validEmailUpdateCode.newEmail;

  if (!newEmail) {
    throw new InternalException(
      "New email not found",
      ErrorCode.EMAIL_NOT_FOUND
    );
  }

  const updatedUser = await prismaClient.user.update({
    where: { id: validEmailUpdateCode.userId },
    data: { email: newEmail },
  });

  if (!updatedUser) {
    throw new InternalException(
      "Failed to reset email",
      ErrorCode.INTERNALEXCEPTION
    );
  }

  // delete the update email verification code

  await prismaClient.verificationCode.delete({
    where: { id: verificationCode },
  });

  // Verify the user

  const emailVerificationCode = await prismaClient.verificationCode.findFirst({
    where: {
      userId: updatedUser.id,
      type: VerificationCodeType.EMAIL_VERIFICATION,
      expiresAt: { gt: new Date() },
    },
  });

  if (!emailVerificationCode) {
    throw new InternalException(
      "Email verification code not found",
      ErrorCode.INTERNALEXCEPTION
    );
  }

  const updatedVerifiedUser = await prismaClient.user.update({
    where: {
      id: updatedUser.id,
    },
    data: {
      verified: true,
    },
  });

  if (!updatedVerifiedUser) {
    throw new InternalException(
      "Failed to verify email",
      ErrorCode.INTERNALEXCEPTION
    );
  }

  await prismaClient.verificationCode.delete({
    where: { id: emailVerificationCode.id },
  });

  // delete all the sessions

  await prismaClient.session.deleteMany({
    where: { userId: updatedUser.id },
  });

  // Do not return user's password

  return omitPassword(updatedVerifiedUser);
};
