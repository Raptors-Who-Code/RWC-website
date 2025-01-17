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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.createEvent = void 0;
const uuid_1 = require("uuid");
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const supabaseStorage_1 = __importDefault(require("../utils/supabaseStorage"));
const createEvent = (eventData, user, file, fileBase64) => __awaiter(void 0, void 0, void 0, function* () {
    let event;
    if (file && fileBase64) {
        // Generate a unique name for the image using UUID
        const uniqueImageName = `${(0, uuid_1.v4)()}-${file.originalname}`;
        const filePath = `users/${user.id}/events/${uniqueImageName}`;
        // Upload image to Supabase Storage
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
        event = yield __1.prismaClient.event.create({
            data: Object.assign(Object.assign({}, eventData), { imageUrl: image.publicUrl }),
        });
    }
    else {
        event = yield __1.prismaClient.event.create({
            data: Object.assign({}, eventData),
        });
    }
    return event;
});
exports.createEvent = createEvent;
const deleteEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield __1.prismaClient.event.findUnique({
        where: { id: eventId },
    });
    if (!event) {
        throw new exceptions_1.NotFoundException("Event not found", root_1.ErrorCode.EVENT_NOT_FOUND);
    }
    const user = yield __1.prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const isUsersEvent = event.userId === userId;
    const isUserAdmin = user.role === "ADMIN";
    if (!isUsersEvent && !isUserAdmin) {
        throw new exceptions_1.ForbiddenException("You are not authorized to delete this event", root_1.ErrorCode.UNAUTHORIZED);
    }
    const imageUrl = event.imageUrl;
    if (imageUrl) {
        const filePath = imageUrl.split("/storage/v1/object/public/images/")[1];
        const { error } = yield supabaseStorage_1.default.storage.from("images").remove([filePath]);
        if (error) {
            console.log("Error deleting image", error);
            throw new exceptions_1.InternalException("Failed to delete image from Supabase Storage", root_1.ErrorCode.DELETE_FAILED);
        }
    }
    const deletedEvent = yield __1.prismaClient.event.delete({
        where: { id: eventId },
    });
    if (!deletedEvent) {
        throw new exceptions_1.NotFoundException("Event not found", root_1.ErrorCode.EVENT_NOT_FOUND);
    }
    return deletedEvent;
});
exports.deleteEvent = deleteEvent;
