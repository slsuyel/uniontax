/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

// Ensure the endpoint is unique and avoid calling injectEndpoints more than once
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/user/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profileCreate"] as any,
    }),

    userLogin: builder.mutation({
      query: ({ email, password, endpoint }) => ({
        url: `/auth/${endpoint}`,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["profileCreate"] as any,
    }),

    tokenCheck: builder.query({
      query: ({ token }) => ({
        url: `/auth/user/check-token`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    uddoktaTokenCheck: builder.query({
      query: ({ token }) => ({
        url: `/auth/uddokta/check-token`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["check-nid"],
    }),

    resetPassLink: builder.mutation({
      query: ({ data }) => ({
        url: `/user/password/email`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ data }) => ({
        url: `/user/password/reset`,
        method: "POST",
        body: data,
      }),
    }),
    setBankAccount: builder.mutation({
      query: ({ data, token }) => ({
        url: `/user/bank-accounts`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["bank-details"],
    }),

    bankDetails: builder.query({
      query: (token) => ({
        url: `/user/bank-accounts`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["bank-details"] as any,
    }),


    villageList: builder.query({
      query: ({ token, word_no }) => ({
        url: `/user/unioun-info/village`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          word_no, // Send word_no as query parameter
        },
      }),
    }),
    

    postOfficeList: builder.query({
      query: (token) => ({
        url: `/user/unioun-info/post-office`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    unionProfile: builder.query({
      query: ({ token }) => ({
        url: `/user/union-info`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["profileUpdate"] as any,
    }),
    updateUnion: builder.mutation({
      query: ({ token, data }) => ({
        url: `/user/union-info`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["profileUpdate"],
    }),

    logout: builder.mutation({
      query: ({ token }) => ({
        url: `/auth/user/logout`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["logout"] as any,
    }),

    changePassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/auth/user/change-password`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserLoginMutation,
  useTokenCheckQuery,
  useResetPasswordMutation,
  useLogoutMutation,
  useUnionProfileQuery,
  useUpdateUnionMutation,
  useResetPassLinkMutation,
  useChangePasswordMutation,
  useUddoktaTokenCheckQuery,
  useSetBankAccountMutation,
  useBankDetailsQuery,
  useVillageListQuery,
  usePostOfficeListQuery,
} = authApi;
