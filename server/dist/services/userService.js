"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetEmail = exports.sendEmailResetEmail = exports.updateUser = void 0;
const bcrypt_1 = require("bcrypt");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const uuid_1 = require("uuid");
const supabaseStorage_1 = __importDefault(require("../utils/supabaseStorage"));
const __1 = require("..");
const client_1 = require("@prisma/client");
const date_1 = require("../utils/date");
const secrets_1 = require("../secrets");
const sendMail_1 = require("../utils/sendMail");
const emailTemplates_1 = require("../utils/emailTemplates");
const omitPassword_1 = require("../utils/omitPassword");
const updateUser = (oldUserData, updateUserData, file, fileBase64) => __awaiter(void 0, void 0, void 0, function* () {
    if (updateUserData.password) {
        // Check if the old password is correct
        const isPasswordCorrect = (0, bcrypt_1.compareSync)(updateUserData.password, oldUserData.password);
        if (!isPasswordCorrect) {
            throw new exceptions_1.UnauthorizedException("Old password is incorrect", root_1.ErrorCode.UNAUTHORIZED);
        }
    }
    let imageUrl;
    if (file && fileBase64) {
        // Generate a unique name for the image using UUID
        const uniqueImageName = `${(0, uuid_1.v4)()}-${file.originalname}`;
        const filePath = `users/${oldUserData.id}/profile/${uniqueImageName}`;
        // Upload profile picture to supabase storage
        const { data, error } = yield supabaseStorage_1.default.storage
            .from("images")
            .upload(filePath, fileBase64, {
            contentType: file.mimetype,
        });
        if (error) {
            console.log("Error uploading image", error);
            throw new exceptions_1.InternalException("Failed to upload image to Supabase Storage", root_1.ErrorCode.UPLOAD_FAILED);
        }
        //get public url of the uploaded file
        const { data: image } = supabaseStorage_1.default.storage
            .from("images")
            .getPublicUrl(data.path);
        imageUrl = image.publicUrl;
    }
    // Create an update object with only the defined properties
    const updateUser = Object.assign(Object.assign({}, updateUserData), (imageUrl && { profilePicUrl: imageUrl, customProfilePic: true }));
    //exclude the role property from updateData object. Users will not be able to update their own role
    const { role } = updateUser, dataToUpdate = __rest(updateUser, ["role"]);
    // Update the user in the database
    const updatedUser = yield __1.prismaClient.user.update({
        where: { id: oldUserData.id },
        data: dataToUpdate,
    });
    return updatedUser;
});
exports.updateUser = updateUser;
const sendEmailResetEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ newEmail, password, userId, }) {
    try {
        const user = yield __1.prismaClient.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new exceptions_1.UnauthorizedException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
        }
        // validate password from the request
        if (!password) {
            throw new exceptions_1.UnauthorizedException("Password is required", root_1.ErrorCode.PASSWORD_REQUIRED);
        }
        if (!(0, bcrypt_1.compareSync)(password, user.password)) {
            throw new exceptions_1.UnauthorizedException("Invalid password", root_1.ErrorCode.INCORRECT_PASSWORD);
        }
        // check if the new email is already in use
        const existingUser = yield __1.prismaClient.user.findUnique({
            where: { email: newEmail },
        });
        if (existingUser) {
            throw new exceptions_1.UnauthorizedException("Email already in use", root_1.ErrorCode.EMAIL_ALREADY_IN_USE);
        }
        // check if email is the same as the current email
        if (newEmail === user.email) {
            throw new exceptions_1.UnauthorizedException("Email is the same as the current email", root_1.ErrorCode.EMAIL_SAME_AS_CURRENT);
        }
        // check email rate limit
        const fiveMinAgo = (0, date_1.fiveMinutesAgo)();
        const count = yield __1.prismaClient.verificationCode.count({
            where: {
                userId: user.id,
                type: client_1.VerificationCodeType.EMAIL_UPDATE,
                createdAt: { gte: fiveMinAgo },
            },
        });
        if (!(count <= 1)) {
            throw new exceptions_1.TooManyRequestsException("Too many requests, please try again later", root_1.ErrorCode.TOO_MANY_REQUESTS);
        }
        // create a verification code
        const expiresAt = (0, date_1.oneHourFromNow)();
        const verificationCode = yield __1.prismaClient.verificationCode.create({
            data: {
                userId: user.id,
                type: client_1.VerificationCodeType.EMAIL_UPDATE,
                expiresAt,
                newEmail: newEmail,
            },
        });
        // send verification email
        const url = `${secrets_1.APP_ORIGIN}/email/reset?code=${verificationCode.id}&exp=${expiresAt.getTime()}`;
        const { data, error } = yield (0, sendMail_1.sendMail)(Object.assign({ to: newEmail }, (0, emailTemplates_1.getEmailResetTemplate)(url, user.email, newEmail)));
        if (!(data === null || data === void 0 ? void 0 : data.id)) {
            throw new exceptions_1.InternalException(`${error === null || error === void 0 ? void 0 : error.name} - ${error === null || error === void 0 ? void 0 : error.message}`, root_1.ErrorCode.INTERNALEXCEPTION);
        }
        // return success message
        return { url, emailId: data.id };
    }
    catch (error) {
        console.log("SendEmailResetEmailError:", error.message);
        return {};
    }
});
exports.sendEmailResetEmail = sendEmailResetEmail;
const resetEmail = (verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    const validCode = yield __1.prismaClient.verificationCode.findFirst({
        where: {
            id: verificationCode,
            type: client_1.VerificationCodeType.EMAIL_UPDATE,
            expiresAt: { gt: new Date() },
        },
    });
    if (!validCode) {
        throw new exceptions_1.UnauthorizedException("Invalid verification code", root_1.ErrorCode.INVALID_VERIFICATION_CODE);
    }
    // update the user's email
    const newEmail = validCode.newEmail;
    if (!newEmail) {
        throw new exceptions_1.InternalException("New email not found", root_1.ErrorCode.EMAIL_NOT_FOUND);
    }
    const updatedUser = yield __1.prismaClient.user.update({
        where: { id: validCode.userId },
        data: { email: newEmail },
    });
    if (!updatedUser) {
        throw new exceptions_1.InternalException("Failed to reset email", root_1.ErrorCode.INTERNALEXCEPTION);
    }
    // delete the verification code
    yield __1.prismaClient.verificationCode.delete({
        where: { id: verificationCode },
    });
    // delete all the sessions
    yield __1.prismaClient.session.deleteMany({
        where: { userId: updatedUser.id },
    });
    // Do not return user's password
    return (0, omitPassword_1.omitPassword)(updatedUser);
});
exports.resetEmail = resetEmail;
