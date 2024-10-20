import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    //TODO: Use Redux ToolKit Query to make api calls to backend
  }),
});

export const {} = api;
