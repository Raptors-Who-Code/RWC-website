import API from "@/config/apiClient";
import { User } from "@/api/authApi";

export const getUser = async (): Promise<User> => {
  return API.get("/api/user");
};

export const updateUser = async (data: Partial<User>): Promise<User> => {
  return API.put("/api/user", data);
};
