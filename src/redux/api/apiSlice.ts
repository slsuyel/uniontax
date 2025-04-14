import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}`,
    credentials: 'include',
  }),
  // endpoints: (builder: any) => ({}),
  endpoints: () => ({}),
  tagTypes: [
    'logout',
    'profileCreate',
    'profileUpdate',
    'sonod-action',
    'holding-create-update',
    'sonod-fee',
    'holding_pay',
    'check-nid',
    'sonod-apply',
    "sms",
    "bank-details",
  ],
});

export default apiSlice;
