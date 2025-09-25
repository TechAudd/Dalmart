import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/request-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRequestOtpMutation, useVerifyOtpMutation, useLoginMutation } =
  authApiSlice;
