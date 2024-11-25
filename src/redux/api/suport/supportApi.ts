import apiSlice from '../apiSlice';

const supportApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createSupport: builder.mutation({
      query: ({ data, token }) => ({
        url: '/api/user/support',
        method: 'Post',
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['support'],
    }),
    ReplySupport: builder.mutation({
      query: ({ data, id, token }) => ({
        url: `/api/user/support/${id}/reply`,
        method: 'POST',
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['support'],
    }),

    listSupport: builder.query({
      query: token => {
        return {
          url: `/api/user/support`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ['support'],
    }),
    viewSupport: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/api/user/support/${id}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ['support'],
    }),
  }),
});

export const {
  useCreateSupportMutation,
  useListSupportQuery,
  useReplySupportMutation,
  useViewSupportQuery,
} = supportApi;
