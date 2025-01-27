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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDefaultProfilePicture = void 0;
const canvas_1 = require("canvas");
const generateDefaultProfilePicture = (firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    const canvas = (0, canvas_1.createCanvas)(200, 200);
    const context = canvas.getContext("2d");
    // Draw purple background
    context.fillStyle = "#9632D7";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw initials
    context.fillStyle = "#FFFFFF";
    context.font = "bold 100px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(initials, canvas.width / 2, canvas.height / 2);
    // Convert canvas to buffer
    const buffer = canvas.toBuffer("image/png");
    return buffer;
});
exports.generateDefaultProfilePicture = generateDefaultProfilePicture;
