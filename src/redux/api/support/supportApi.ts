/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const supportApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        paymentFailedTicket: builder.mutation({
            query: ({ data }) => ({
                url: `/payment/failed/support/ticket`,
                method: 'Post',
                body: data,
            }),
        }),

    }),
});

export const { usePaymentFailedTicketMutation } = supportApi;
