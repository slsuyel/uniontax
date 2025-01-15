import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.uniontax.gov.bd/api",
    credentials: "include",
  }),
  // endpoints: (builder: any) => ({}),
  endpoints: () => ({}),
  tagTypes: [
    "logout",
    "profileCreate",
    "profileUpdate",
    "sonod-action",
    "holding-create-update",
    "sonod-fee",
    "holding_pay",
    "check-nid",
    "sonod-apply",
  ],
});

export default apiSlice;
