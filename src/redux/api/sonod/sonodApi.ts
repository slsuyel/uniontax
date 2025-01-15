/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const sonodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSonod: builder.query({
      query: ({ sonodName, stutus, token, sondId,page = 1 }) => ({
        url: `/user/sonod/list?sonod_name=${sonodName}&page=${page}&stutus=${stutus}${
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
    englishSonodUpdate: builder.mutation({
      query: ({ id, data, token }) => ({
        url: `/user/english/sonod/update/${id}`,
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
      query: ({ word, token, search, page = 1 }) => ({
        url: `/user/holdingtax?page=${page}&word=${word}${
          search ? `&search=${search}` : ""
        }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["holding-create-update"],
    }),

    allHoldingFrontend: builder.query({
      query: ({ word, search, unioun, page = 1 }) => ({
        url: `/holdingtax/search?page=${page}&word=${word}${
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
    updateHolding: builder.mutation({
      query: ({ data, token,id }) => ({
        url: `/user/holdingtax/${id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["holding-create-update"],
    }),

    holdingBokeyaUpdate: builder.mutation({
      query: ({ id, token, price }) => ({
        url: `/user/holding-bokeya/${id}/update-price`,
        method: "Put",
        headers: { Authorization: `Bearer ${token}` },
        body: {price},
      }),
      invalidatesTags: ["holding-create-update"],
    }),

    sonodAction: builder.mutation({
      query: ({ id, token, sec_prottoyon, sec_prottoyon_en }) => ({
        url: `/user/sonod/action/${id}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { sec_prottoyon, sec_prottoyon_en },
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
  useEnglishSonodUpdateMutation,
  useAllHoldingFrontendQuery,
  useSingleSonodQuery,
  useSingleHoldingPublicQuery,
  useNidCheckMutation,
  useHoldingBokeyaUpdateMutation,
  useUpdateHoldingMutation
} = sonodApi;
