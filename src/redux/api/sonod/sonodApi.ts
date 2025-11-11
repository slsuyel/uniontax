/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const sonodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSonod: builder.query({
      query: ({ sonodName, stutus, token, sondId, page = 1 }) => ({
        url: `/user/sonod/list?sonod_name=${sonodName}&page=${page}&stutus=${stutus}${sondId ? `&sondId=${sondId}` : ""
          }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["sonod-action"],
    }),

    sonodUpdate: builder.mutation({
      query: ({ id, formData, token }) => ({
        url: `/user/sonod/update/${id}`,
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["sonod-action"],
    }),
    tradeKhatUpdate: builder.mutation({
      query: ({ id, data, token }) => ({
        url: `user/sonod/khat/update/${id}`,
        method: "PUT",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["sonod-action"],
    }),


    sonodFilesUpdate: builder.mutation({
      query: ({ id, formData, token }) => ({
        url: `/user/sonod/update/${id}/files`,
        method: "POST",
        body: formData,
        formData: true,
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
        url: `/user/holdingtax?page=${page}&word=${word}${search ? `&search=${search}` : ""
          }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["holding-create-update"],
    }),
    uddoktaAllHolding: builder.query({
      query: ({ word, token, search, page = 1 }) => ({
        url: `/uddokta/holdingtax?page=${page}&word=${word}${search ? `&search=${search}` : ""
          }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["holding-create-update"],
    }),

    allHoldingFrontend: builder.query({
      query: ({ word, search, unioun, page = 1 }) => ({
        url: `/holdingtax/search?page=${page}&word=${word}${search ? `&search=${search}&unioun=${unioun}` : ""
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

    addHoldingBokeya: builder.mutation({
      query: ({ id, data, token }) => ({
        url: `/user/holdingtax/${id}/bokeya`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),



    uddoktaSingleHolding: builder.query({
      query: ({ id, token }) => ({
        url: `/uddokta/holdingtax/${id}`,
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
    uddoktaAddHolding: builder.mutation({
      query: ({ data, token }) => ({
        url: `/uddokta/holdingtax`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["holding-create-update"],
    }),
    updateHolding: builder.mutation({
      query: ({ data, token, id }) => ({
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
        body: { price },
      }),
      invalidatesTags: ["holding-create-update"],
    }),
    importHolding: builder.mutation({
      query: ({ token, formData }) => ({
        url: `/user/holding-tax/import`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      }),
      invalidatesTags: ["holding-create-update"],
    }),
    renewPreviousHolding: builder.mutation({
      query: ({ token, union }) => ({
        url: `user/holding-tax/Renew?unioun=${union}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
      invalidatesTags: ["holding-create-update"],
    }),


    sonodAction: builder.mutation({
      query: ({
        id,
        token,
        sec_prottoyon,
        sec_prottoyon_en,
        cancel_reason,
        cancel,
      }) => {
        const queryParams = cancel ? `?action=${cancel}` : "";
        return {
          url: `/user/sonod/action/${id}${queryParams}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: { sec_prottoyon, sec_prottoyon_en, cancel_reason },
        };
      },
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
    bikeRegistration: builder.mutation({
      query: (data) => ({
        url: `bike-registration`,
        method: "POST",
        body: data,
      }),
    }),
    bikeRegistrationsList: builder.query({
      query: ({ token, page, per_page }) => ({
        url: `/user/auto-bike-registration?page=${page}&per_page=${per_page}`,
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),


  }),
});

export const {
  useAllSonodQuery,
  useSonodUpdateMutation,
  useSonodActionMutation,
  useAllHoldingQuery,
  useSingleHoldingQuery,
  useAddHoldingBokeyaMutation,
  useAddHoldingMutation,
  useSonodFeesQuery,
  useUpdateSonodFeesMutation,
  useEnglishSonodUpdateMutation,
  useAllHoldingFrontendQuery,
  useSingleSonodQuery,
  useSingleHoldingPublicQuery,
  useNidCheckMutation,
  useHoldingBokeyaUpdateMutation,
  useUpdateHoldingMutation,
  useImportHoldingMutation,
  useUddoktaAllHoldingQuery,
  useUddoktaAddHoldingMutation,
  useUddoktaSingleHoldingQuery,
  useSonodFilesUpdateMutation,
  useRenewPreviousHoldingMutation,
  useTradeKhatUpdateMutation,
  useBikeRegistrationMutation,
  useBikeRegistrationsListQuery
} = sonodApi;
