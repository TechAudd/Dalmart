import { baseURL } from "./api";
import { apiSlice } from "./apiSlice";

export const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTest: builder.query({
      query: () => ({
        url: baseURL + "/test",
      }),
      keepUnusedDataFor: 5,
    }),

    updateAppliedLeave: builder.mutation({
      query: (data) => ({
        url: baseURL + "/updateleave",
        method: ["PUT"],
        body: data,
      }),
    }),
  }),
});

export const { useFetchTestQuery, useUpdateAppliedLeaveMutation } =
  testApiSlice;
