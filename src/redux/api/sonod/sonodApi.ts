/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const sonodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSonod: builder.query({
      query: ({ sonodName, stutus, token }) => ({
        url: `user/sonod/list?sonod_name=${sonodName}&stutus=${stutus}`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useAllSonodQuery } = sonodApi;
