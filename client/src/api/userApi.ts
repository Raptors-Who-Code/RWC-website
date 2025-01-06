import API from "@/config/apiClient";
import { User } from "@/features/auth/authSlice";

export const getUser = async (): Promise<User> => {
  return API.get("/api/user");
};
