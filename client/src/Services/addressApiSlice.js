import { apiSlice } from "./apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listAddresses: builder.query({
      query: () => "/address",
      keepUnusedDataFor: 5,
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { useListAddressesQuery, useAddAddressMutation } = addressApiSlice;
