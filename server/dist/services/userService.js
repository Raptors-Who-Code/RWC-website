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
exports.updateUser = void 0;
const bcrypt_1 = require("bcrypt");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const uuid_1 = require("uuid");
const supabaseStorage_1 = __importDefault(require("../utils/supabaseStorage"));
const __1 = require("..");
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
    const updateUser = Object.assign(Object.assign({}, updateUserData), (imageUrl && { profilePicUrl: imageUrl }));
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
