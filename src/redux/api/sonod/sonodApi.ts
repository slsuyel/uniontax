/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const sonodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSonod: builder.query({
      query: ({ sonodName, stutus, token, sondId }) => ({
        url: `/user/sonod/list?sonod_name=${sonodName}&stutus=${stutus}${sondId ? `&sondId=${sondId}` : ""
          }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["sonod-action"],
    }),

    singleSonod: builder.query({
      query: ({ token, id }) => ({
        url: `/user/sonod/single/${id}`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["sonod-action"],
    }),

    allHolding: builder.query({
      query: ({ word, token, search }) => ({
        url: `/user/holdingtax?page=1&word=${word}${search ? `&search=${search}` : ""
          }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["holding-create-update"],
    }),

    allHoldingFrontend: builder.query({
      query: ({ word, search, unioun }) => ({
        url: `/holdingtax/search?page=1&word=${word}${search ? `&search=${search}&unioun=${unioun}` : ""
          }`,
        method: "GET",
      }),
      providesTags: ["holding-create-update"],
    }),

    sonodFees: builder.query({
      query: ({ token }) => ({
        url: `/user/sonodnamelists/with-fees`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["sonod-fee"],
    }),
    updateSonodFees: builder.mutation({
      query: ({ token, data }) => ({
        url: `/user/sonodfees`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["sonod-fee"],
    }),

    singleHolding: builder.query({
      query: ({ id, token }) => ({
        url: `/user/holdingtax/${id}`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["holding-create-update"],
    }),

    addHolding: builder.mutation({
      query: ({ data, token }) => ({
        url: `/user/holdingtax`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["holding-create-update"],
    }),

    sonodAction: builder.mutation({
      query: ({ id, token }) => ({
        url: `/user/sonod/action/${id}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["sonod-action"],
    }),
  }),
});

export const {
  useAllSonodQuery,
  useSonodActionMutation,
  useAllHoldingQuery,
  useSingleHoldingQuery,
  useAddHoldingMutation,
  useSonodFeesQuery,
  useUpdateSonodFeesMutation,
  useAllHoldingFrontendQuery,
  useSingleSonodQuery,
} = sonodApi;
