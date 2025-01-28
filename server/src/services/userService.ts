import { compareSync } from "bcrypt";
import { Role, UserData } from "../types/userTypes";
import {
  InternalException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabaseStorage";
import { prismaClient } from "..";
import { mapPrismaRoleToCustomRole } from "../utils/mapRoleToCustomRole";

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
    ...(imageUrl && { profilePicUrl: imageUrl }),
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
