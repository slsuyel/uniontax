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
      query: ({ email, password }) => ({
        url: `/auth/user/login`,
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
      providesTags: ["profileUpdate", "profileCreate"] as any,
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

    myProfile: builder.query({
      query: ({ token }) => ({
        url: `/user/profile`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["profileUpdate", "profileCreate", "logout"] as any,
    }),

    updateProfile: builder.mutation({
      query: ({ token, data }) => ({
        url: `/user/profile`,
        method: "post",
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
    checkOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/verify-otp`,
        method: "POST",
        body: { email, otp },
      }),
    }),

    resentOtp: builder.mutation({
      query: ({ email }) => ({
        url: `/resend/otp`,
        method: "POST",
        body: { email },
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
  useMyProfileQuery,

  useUpdateProfileMutation,
  useResetPassLinkMutation,
  useChangePasswordMutation,
  useCheckOtpMutation,
  useResentOtpMutation,
} = authApi;
