/* eslint-disable @typescript-eslint/no-explicit-any */

import apiSlice from "../apiSlice";

const sonodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSonod: builder.query({
      query: ({ sonodName, stutus, token, sondId }) => ({
        url: `user/sonod/list?sonod_name=${sonodName}&stutus=${stutus}${
          sondId ? `&sondId=${sondId}` : ""
        }`,
        method: "Get",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useAllSonodQuery } = sonodApi;
