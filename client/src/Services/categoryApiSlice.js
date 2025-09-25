import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => "/categories",
      keepUnusedDataFor: 5,
    }),
    fetchCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchCategoryByIdQuery } =
  categoryApiSlice;
