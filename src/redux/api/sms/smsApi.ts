/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const smsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        purchaseSms: builder.mutation({
            query: ({ data, token }) => ({
                url: `/user/sms-purchase`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["sms"],
        }),
        allSms: builder.query({
            query: ({ perPage = 10, token }) => ({
                url: `/user/purchasesms/list?per_page=${perPage}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["sms"],
        }),
    }),
});

export const { usePurchaseSmsMutation, useAllSmsQuery } = smsApi;
