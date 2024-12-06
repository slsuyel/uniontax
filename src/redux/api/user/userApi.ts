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
    sonodSearch: builder.mutation({
      query: ({ sonodType, sonodNo }) => ({
        url: `/sonod/search?sonod_name=${sonodType}&sonod_Id=${sonodNo}`,
        method: "Post",
      }),
    }),
    unionInfo: builder.query({
      query: (unionName) => ({
        url: `/global/uniouninfo?name=${unionName}`,
        method: "Get",
      }),
    }),
    tradeInfo: builder.query({
      query: ({ unionName, TradeLicenseKhat }) => ({
        url: `/global/uniouninfo?name=${unionName}&type=${TradeLicenseKhat}`,
        method: "Get",
      }),
    }),
  }),
});

export const {
  useSonodApplyMutation,
  useUnionInfoQuery,
  useTradeInfoQuery,
  useSonodSearchMutation,
} = userApi;
