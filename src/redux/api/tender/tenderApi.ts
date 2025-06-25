/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const tenderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // GET: tender?union_name=test&status=pending
        getTenders: builder.query<any, any>({
            query: ({ status, token }) => ({
                url: `tender?status=${status}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        // GET: get/single/tender/1
        getSingleTender: builder.query<any, any>({
            query: ({ id, token }) => ({
                url: `get/single/tender/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        // POST: tender
        createTender: builder.mutation<any, any>({
            query: ({ data, token }) => ({
                url: 'tender',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        // PUT: committe/update/1
        updateCommittee: builder.mutation<any, any>({
            query: ({ id, data, token }) => ({
                url: `committe/update/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    useGetTendersQuery,
    useGetSingleTenderQuery,
    useCreateTenderMutation,
    useUpdateCommitteeMutation,
} = tenderApi;
