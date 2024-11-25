/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.zsi.ai',
    credentials: 'include',
  }),
  endpoints: (builder: any) => ({}),
  tagTypes: ['logout', 'profileCreate', 'profileUpdate', 'buy-pack', 'support'],
});

export default apiSlice;
