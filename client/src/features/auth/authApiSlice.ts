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
      query: () => "/api/user",
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGetAuthenticatedUserQuery } = authApiSlice;
