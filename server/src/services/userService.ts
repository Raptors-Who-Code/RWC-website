import { UserData } from "../types/userTypes";

interface UpdateUserData {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  role?: string | undefined;
  profilePic?: ArrayBuffer | null;
}

export const updateUser = (
  user: UserData,
  updateUserData: UpdateUserData
) => {};
