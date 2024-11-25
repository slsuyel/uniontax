/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

// Ensure the endpoint is unique and avoid calling injectEndpoints more than once
const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    userSignup: builder.mutation({
      query: ({ data }) => ({
        url: `/api/auth/user/register`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profileCreate'] as any,
    }),
    verifyEmail: builder.query({
      query: ({ token }) => ({
        url: `/email/verify/${token}`,
      }),
    }),
    resendEmail: builder.mutation({
      query: ({ data }) => ({
        url: `/resend/verification-link`,
        method: 'POST',
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: ({ data }) => ({
        url: `/api/auth/user/login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profileCreate'] as any,
    }),
    tokenCheck: builder.query({
      query: ({ token }) => ({
        url: `/api/auth/user/check-token`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ['profileUpdate', 'profileCreate'] as any,
    }),

    resetPassLink: builder.mutation({
      query: ({ data }) => ({
        url: `/api/user/password/email`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data }) => ({
        url: `/api/user/password/reset`,
        method: 'POST',
        body: data,
      }),
    }),

    myProfile: builder.query({
      query: ({ token }) => ({
        url: `/api/user/profile`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['profileUpdate', 'profileCreate', 'logout'] as any,
    }),
    myPurchases: builder.query({
      query: ({ token }) => ({
        url: `/api/user/packages/history`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ token, data }) => ({
        url: `/api/user/profile`,
        method: 'post',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['profileUpdate'],
    }),

    logout: builder.mutation({
      query: ({ token }) => ({
        url: `/api/auth/user/logout`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['logout'] as any,
    }),

    changePassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/api/auth/user/change-password`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
    }),
    checkOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/api/verify-otp`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    resentOtp: builder.mutation({
      query: ({ email }) => ({
        url: `/api/resend/otp`,
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  useVerifyEmailQuery,
  useResendEmailMutation,
  useUserLoginMutation,
  useTokenCheckQuery,
  useResetPasswordMutation,
  useLogoutMutation,
  useMyProfileQuery,
  useMyPurchasesQuery,
  useUpdateProfileMutation,
  useResetPassLinkMutation,
  useChangePasswordMutation,
  useCheckOtpMutation,
  useResentOtpMutation,
} = authApi;
