/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    sonodApply: builder.mutation({
      query: data => ({
        url: '/sonod/submit',
        method: 'POST',
        body: data,
      }),
    }),
    sonodSearch: builder.mutation({
      query: ({ sonodType, sonodNo }) => ({
        url: `/sonod/search?sonod_name=${sonodType}&sonod_Id=${sonodNo}`,
        method: 'Post',
      }),
    }),

    // payTax: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/pay/holding/tax/${id}`,
    //     method: 'Post',
    //     body: data,
    //   }),
    //   invalidatesTags: ['holding_pay'],
    // }),

    createHolding: builder.mutation({
      query: ({ data }) => ({
        url: `/user/holdingtax`,
        method: 'Post',
        body: data,
      }),
      invalidatesTags: ['holding-create-update'],
    }),
    // checkPayment: builder.mutation({
    //   query: ({ trnx_id }) => ({
    //     url: `/ekpay/check/payments/ipn`,
    //     method: 'Post',
    //     body: { trnx_id },
    //   }),
    // }),


    unionInfo: builder.query({
      query: ({ unionName, token }) => ({
        url: `/global/uniouninfo?name=${unionName}`,
        method: 'Get',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['sonod-action'],
    }),

    tradeInfo: builder.query({
      query: ({ unionName }) => ({
        url: `/global/uniouninfo?name=${unionName}&type=TradeLicenseKhat`,
      }),
    }),

    // failedPayment: builder.query({
    //   query: ({ sonod_type, token, date }) => ({
    //     url: `/user/failed-payments?date=${date}&sonod_type=${sonod_type}`,
    //     method: 'Get',
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   providesTags: ['holding_pay'],
    // }),
  }),
});

export const {
  useSonodApplyMutation,
  useUnionInfoQuery,
  useTradeInfoQuery,
  useSonodSearchMutation,
  // usePayTaxMutation,
  useCreateHoldingMutation,
  // useFailedPaymentQuery,
} = userApi;
