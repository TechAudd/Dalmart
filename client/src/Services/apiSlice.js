import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./api";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state?.auth?.userInfo?.token || "";
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Auth", "Categories", "Products", "Cart", "Address", "Orders"],
  endpoints: () => ({}),
});
