/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from '../apiSlice';

const packageApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    allPackage: builder.query({
      query: ({ month = 1 }) => ({
        url: `/api/global/packages?discount_months=${month}`,
        method: 'GET',
      }),
    }),

    singlePackage: builder.query({
      query: ({ id, discount_months }) => {
        const queryParams = discount_months
          ? `?discount_months=${discount_months}`
          : '';
        return {
          url: `/api/global/package/${id}${queryParams}`,
          method: 'GET',
        };
      },
    }),

    allAddons: builder.query({
      query: () => ({
        url: `/api/global/package-addons`,
        method: 'GET',
      }),
    }),

    buyPackage: builder.mutation({
      query: ({ data, token, discount_months }) => ({
        url: `/api/user/package/subscribe?discount_months=${discount_months}`,
        method: 'POST',
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['buy-pack'] as any,
    }),
    checkCoupon: builder.mutation({
      query: ({ couponFields, token }) => ({
        url: `/api/coupons/check`,
        method: 'POST',
        body: couponFields, 
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useAllPackageQuery,
  useSinglePackageQuery,
  useAllAddonsQuery,
  useBuyPackageMutation,
  useCheckCouponMutation,
} = packageApi;
