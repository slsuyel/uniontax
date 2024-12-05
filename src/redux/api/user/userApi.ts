/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sonodApply: builder.mutation({
      query: (data) => ({
        url: "/sonod/submit",
        method: "POST",
        body: data,
      }),
    }),
    unionInfo: builder.query({
      query: (unionName) => ({
        url: `/global/uniouninfo?name=${unionName}`,
        method: "Get",
      }),
    }),
  }),
});

export const { useSonodApplyMutation, useUnionInfoQuery } = userApi;
