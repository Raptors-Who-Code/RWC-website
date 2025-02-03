import API from "@/config/apiClient";
import { User } from "@/api/authApi";
import { options } from "@/config/apiClient";
import axios from "axios";

const getUserAPI = axios.create(options);

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await getUserAPI.get("/api/user");
    return response.data;
  } catch (error) {
    return null;
  }
};
export const updateUser = async (data: Partial<User>): Promise<User> => {
  return API.put("/api/user", data);
};
