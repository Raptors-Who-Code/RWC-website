import axios from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
};

const API = axios.create(options);

// Anytime we get a successful response, we are not going to return the entire axios response instead just response.data
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error.response;
    return Promise.reject({ status, ...data });

    // Any time error is thrown we have erro status and data which any properties returned from api
  }
);

export default API;
