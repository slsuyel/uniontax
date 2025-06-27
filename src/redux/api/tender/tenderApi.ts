/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const tenderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // GET: tender?union_name=test&status=pending
        getTenders: builder.query({
            query: ({ status, token }) => ({
                url: `tender?status=${status}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        // GET: get/single/tender/1
        getSingleTender: builder.query<any, any>({
            query: (id) => ({
                url: `/tender/${id}`,
            }),
        }),
        getTenderTime: builder.query<any, any>({
            query: (id) => ({
                url: `tenders/${id}`,
            }),
        }),

        // POST: tender
        createTender: builder.mutation<any, any>({
            query: ({ data, token }) => ({
                url: '/tender',
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
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        dropTender: builder.mutation<any, any>({
            query: ({ data, }) => ({
                url: `/drop/tender`,
                method: 'POST',
                body: data,
            }),
        }),
        committeeValidation: builder.mutation<any, any>({
            query: ({ token, data }) => ({
                url: `/tender/committee/validation`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),


        selectTender: builder.mutation({
            query: (tenderId) => ({
                url: `tender/selection/${tenderId}`,
                method: 'POST',
            }),
        }),



        GetAllApplications: builder.query({
            query: ({ tender_id, status }) => {
                const queryParam = status ? `?status=${status}` : '';
                return `/get/all/aplications/${tender_id}${queryParam}`;
            },
        }),


        updatePermitDetails: builder.mutation<any, { id: number; data: any; token: string }>({
            query: ({ id, data, token }) => ({
                url: `tenderlist/${id}/update-permit-details`,
                method: 'POST',
                body: data,
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
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
    useGetTenderTimeQuery,
    useDropTenderMutation,
    useCommitteeValidationMutation,
    useSelectTenderMutation,
    useLazyGetAllApplicationsQuery,
    useUpdatePermitDetailsMutation,
} = tenderApi;
