import { apiSlice } from "@/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApiSlice;
