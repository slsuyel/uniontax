/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const paymentApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    checkPayment: builder.mutation({
      query: ({ data }) => ({
        url: `ekpay/check/payments/ipn`,
        method: 'Post',
        body: data,
      }),
    }),

    callipn: builder.mutation({
      query: ({ data }) => ({
        url: `/ekpay/ipn`,
        method: 'Post',
        body: data,
      }),
    }),
  }),
});

export const { useCallipnMutation, useCheckPaymentMutation } = paymentApi;
