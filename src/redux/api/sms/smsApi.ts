/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const smsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        purchaseSms: builder.mutation({
            query: ({ data,token }) => ({
                url: `/user/sms-purchase`,
                method: 'Post',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
        }),

    }),
});

export const { usePurchaseSmsMutation } = smsApi;
