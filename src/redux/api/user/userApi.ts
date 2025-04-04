/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sonodApply: builder.mutation({
      query: ({ formData, token }) => ({
        url: "/sonod/submit",
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["sonod-action"],
    }),

    renewSonod: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sonod/renew/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sonod-action"],
    }),

    sonodSearch: builder.mutation({
      query: ({ sonodType, sonodNo }) => ({
        url: `/sonod/search?sonod_name=${sonodType}&sonod_Id=${sonodNo}`,
        method: "Post",
      }),
    }),
    sonodSearchById: builder.query({
      query: (id) => ({
        url: `/sonod/search?id=${id}`,
        method: "Get",
      }),
    }),

    createHolding: builder.mutation({
      query: ({ data }) => ({
        url: `/user/holdingtax`,
        method: "Post",
        body: data,
      }),
      invalidatesTags: ["holding-create-update"],
    }),

    unionInfo: builder.query({
      query: ({ unionName, token }) => ({
        url: `/global/uniouninfo?name=${unionName}`,
        method: "Get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["sonod-action"],
    }),

    getUnionInfo: builder.mutation({
      query: ({ unionName, token }) => ({
        url: `/global/uniouninfo?name=${unionName}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    tradeInfo: builder.query({
      query: ({ unionName }) => ({
        url: `/global/uniouninfo?name=${unionName}&type=TradeLicenseKhat`,
      }),
    }),
    dbMetrics: builder.query({
      query: ({ token }) => ({
        url: `/user/dashboard/metrics`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

        // New query for fetching post offices by union
        getPostOffices: builder.query({
          query: (union) => ({
            url: `/global/get/post/office/${union}`,
            method: "GET",
          }),
        }),

        getVillages: builder.query({
          query: ({ union, word }: { union: string; word: string }) => ({
            url: `/global/get/village/${union}/${word}`,
            method: "GET",
          }),
        }),



  }),
});

export const {
  useSonodApplyMutation,
  useUnionInfoQuery,
  useTradeInfoQuery,
  useSonodSearchMutation,
  useCreateHoldingMutation,
  useRenewSonodMutation,
  useDbMetricsQuery,
  useGetUnionInfoMutation,
  useSonodSearchByIdQuery,
  useGetPostOfficesQuery, 
  useGetVillagesQuery, 
} = userApi;
