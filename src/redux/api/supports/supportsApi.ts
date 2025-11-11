// supportsApi.ts
import apiSlice from "../apiSlice";

const token = localStorage.getItem("token") || "";

export const supportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSupports: builder.query({
            query: () => ({
                url: "/admin/supports",
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["Supports"],
        }),

        // Get single support
        getSupport: builder.query({
            query: (support_id) => ({
                url: `/supports/${support_id}`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["Supports"],
        }),

        // Create support
        createSupport: builder.mutation({
            query: ({data}) => ({
                url: "/supports",
                method: "POST",
                body: data,
            }),
        }),

        // Update support status (Admin)
        updateSupportStatus: builder.mutation({
            query: ({ support_id, status }) => ({
                url: `/admin/supports/${support_id}/status`,
                method: "PUT",
                body: { status },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["Supports"],
        }),

    }),
});

export const {
    useGetAllSupportsQuery,
    useGetSupportQuery,
    useCreateSupportMutation,
    useUpdateSupportStatusMutation,
} = supportsApi;
