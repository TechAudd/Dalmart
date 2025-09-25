import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartMutation } = cartApiSlice;
