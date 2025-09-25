import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listProducts: builder.query({
      query: () => "/products",
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      keepUnusedDataFor: 5,
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) => `/products/category/${categoryId}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useListProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} = productApiSlice;
