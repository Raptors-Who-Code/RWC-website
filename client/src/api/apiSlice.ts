import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout, User } from "../features/auth/authSlice";

interface RefreshResponse {
  accessToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: { token: string } }).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // Arguments type (string for URL or FetchArgs for detailed requests)
  unknown, // Result type (can be more specific if you know the response structure)
  FetchBaseQueryError // Error type
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = (await baseQuery("/refresh", api, extraOptions)) as {
      data: RefreshResponse;
    };

    console.log(refreshResult);

    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      const user = (api.getState() as { auth: { user: User } }).auth.user;
      // store the new token
      api.dispatch(setCredentials({ user, accessToken }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({}),
});

// reducerPath: "api",
// tagTypes: ["Auth"],
// endpoints: (build) => ({
//   //TODO: Use Redux ToolKit Query to make api calls to backend
// }),

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
