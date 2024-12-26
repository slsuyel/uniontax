/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkPayment: builder.mutation({
      query: (trnx_id) => {
        return {
          url: `/ekpay/check/payments/ipn`,
          method: "POST", // Use uppercase for HTTP methods
          body: trnx_id,
        };
      },
    }),

    callipn: builder.mutation({
      query: ({ data }) => ({
        url: `/ekpay/ipn`,
        method: "Post",
        body: data,
      }),
    }),

    failedPayment: builder.query({
      query: ({ sonod_type, token, date }) => ({
        url: `/user/failed-payments?date=${date}&sonod_type=${sonod_type}`,
        method: "Get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["holding_pay"],
    }),

    payTax: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pay/holding/tax/${id}`,
        method: "Post",
        body: data,
      }),
      invalidatesTags: ["holding_pay"],
    }),
  }),
});

export const {
  useCallipnMutation,
  useCheckPaymentMutation,
  useFailedPaymentQuery,
  usePayTaxMutation,
} = paymentApi;
