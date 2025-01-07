import axios from "axios";
import queryClient from "./queryClient";
import { showToast } from "@/utils/toast";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

// Anytime we get a successful response, we are not going to return the entire axios response instead just response.data
API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    // try to refresh the access token behind scenes
    if (status === 401) {
      try {
        await API.get("/api/auth/refresh");
        return TokenRefreshClient(config);
      } catch (error) {
        queryClient.clear();
        showToast("Unauthorized access. Please log in again.", "error");
        console.error(error);
      }
    }

    return Promise.reject({ status, ...data });
    // Any time error is thrown we have erro status and data which any properties returned from api
  }
);

export default API;
