import { User } from "@prisma/client";
export const omitPassword = (user: User) => {
  const { password: userPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
