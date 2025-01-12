import { Role } from "../types/userTypes";

export const mapPrismaRoleToCustomRole = (prismaRole: string): Role => {
  switch (prismaRole) {
    case "ADMIN":
      return Role.ADMIN;
    case "MEMBER":
      return Role.MEMBER;
    default:
      throw new Error(`Unknown role: ${prismaRole}`);
  }
};
