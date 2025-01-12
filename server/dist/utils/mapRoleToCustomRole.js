"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrismaRoleToCustomRole = void 0;
const userTypes_1 = require("../types/userTypes");
const mapPrismaRoleToCustomRole = (prismaRole) => {
    switch (prismaRole) {
        case "ADMIN":
            return userTypes_1.Role.ADMIN;
        case "MEMBER":
            return userTypes_1.Role.MEMBER;
        default:
            throw new Error(`Unknown role: ${prismaRole}`);
    }
};
exports.mapPrismaRoleToCustomRole = mapPrismaRoleToCustomRole;
