// businessApi.ts

import apiSlice from "../apiSlice";

const token = localStorage.getItem("token") || "";

export const businessApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    
    getBusinessDirectories: builder.query({
      query: () => ({
        url: "/user/business-directories",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["profileCreate"],
    }),

    getBusinessDirectory: builder.query({
      query: ({ id }) => ({
        url: `/user/business-directories/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    createBusinessDirectory: builder.mutation({
      query: (data) => ({
        url: "/user/business-directories",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["profileCreate"],
    }),

    updateBusinessDirectory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/business-directories/${id}`,
        method: "PUT",
        body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["profileCreate"],
    }),

    deleteBusinessDirectory: builder.mutation({
      query: (id) => ({
        url: `/user/business-directories/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["profileCreate"],
    }),
  }),
});

export const {
  useGetBusinessDirectoriesQuery,
  useGetBusinessDirectoryQuery,
  useCreateBusinessDirectoryMutation,
  useUpdateBusinessDirectoryMutation,
  useDeleteBusinessDirectoryMutation,
} = businessApi;
