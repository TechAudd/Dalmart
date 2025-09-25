import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listProducts: builder.query({
      // Accept multiple optional params: search, organic, sort
      query: ({ search = "", isOrganic = false } = {}) => {
        const params = new URLSearchParams();
console.log({search})

        if (search) params.append("search_query", search);
        if (isOrganic) params.append("organic", "true");
        // if (sort && sort !== "relevance") params.append("sort", sort);

        return `/products?${params.toString()}`;
      },
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
