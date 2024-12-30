import { apiSlice } from "@/api/apiSlice";
import { User } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getAuthenticatedUser: builder.query<User, void>({
      query: () => ({
        url: "/api/auth/me",
        method: "GET",
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetAuthenticatedUserQuery,
  useLogoutQuery,
} = authApiSlice;
