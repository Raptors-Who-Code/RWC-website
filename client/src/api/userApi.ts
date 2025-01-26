import API from "@/config/apiClient";
import { User } from "@/api/authApi";

export const getUser = async (): Promise<User> => {
  return API.get("/api/user");
};
