/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const sonodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSonod: builder.query({
      query: ({ sonodName, stutus, token, sondId }) => ({
        url: `/user/sonod/list?sonod_name=${sonodName}&stutus=${stutus}${
          sondId ? `&sondId=${sondId}` : ""
        }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["sonod-action"],
    }),

    sonodUpdate: builder.mutation({
      query: ({ id, data, token }) => ({
        url: `/user/sonod/update/${id}`,
        method: "PUT",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["sonod-action"],
    }),

    singleSonod: builder.query({
      query: ({ token, id, en = false }) => ({
        url: `/user/sonod/single/${id}?en=${en}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["sonod-action"],
    }),

    allHolding: builder.query({
      query: ({ word, token, search }) => ({
        url: `/user/holdingtax?page=1&word=${word}${
          search ? `&search=${search}` : ""
        }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["holding-create-update"],
    }),

    allHoldingFrontend: builder.query({
      query: ({ word, search, unioun }) => ({
        url: `/holdingtax/search?page=1&word=${word}${
          search ? `&search=${search}&unioun=${unioun}` : ""
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

    singleHoldingPublic: builder.query({
      query: ({ id }) => ({
        url: `/holdingtax/boketas/${id}`,
        method: "Get",
      }),
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
      query: ({ id, token, sec_prottoyon }) => ({
        url: `/user/sonod/action/${id}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { sec_prottoyon },
      }),
      invalidatesTags: ["sonod-action"],
    }),
    nidCheck: builder.mutation({
      query: ({ token, data }) => ({
        url: `/auth/uddokta/citizen/information/nid`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["check-nid"],
    }),
  }),
});

export const {
  useAllSonodQuery,
  useSonodUpdateMutation,
  useSonodActionMutation,
  useAllHoldingQuery,
  useSingleHoldingQuery,
  useAddHoldingMutation,
  useSonodFeesQuery,
  useUpdateSonodFeesMutation,
  useAllHoldingFrontendQuery,
  useSingleSonodQuery,
  useSingleHoldingPublicQuery,
  useNidCheckMutation,
} = sonodApi;
