import ProductFilters from "@/Components/ProductComponents/ProductFilters";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CustomLoader } from "../../Components/CommonComponents/Loader";
import { ProductCard } from "../../Components/ProductComponents/ProductCard";
import { useListProductsQuery } from "../../Services/productApiSlice";

const ProductDisplayPage = () => {
  const {
    data: productList,
    isLoading: isProductListLoading,
    isError: productListFetchError,
    refetch: productListRefetch,
  } = useListProductsQuery();
  const [searchKey,setSearchKey] = useState("")

  if (isProductListLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CustomLoader />
      </div>
    );
  }

  if (productListFetchError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        <p className="text-red-600 font-medium">Failed to load products 😢</p>
        <Button onClick={productListRefetch} className="shadow-md">
          Try Again
        </Button>
      </div>
    );
  }

  if (!productList || productList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <p className="text-lg">No products available</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 ">
      {/* Sticky filter bar */}
      <div className="sticky top-10 z-50 bg-white shadow-md rounded-b-lg ">
        <ProductFilters />
      </div>

      <h1 className="text-2xl font-bold mb-6 text-gray-800 mt-10">
        What would you like to shop !
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((productInfo) => (
          <ProductCard key={productInfo.id} product={productInfo} />
        ))}
      </div>
    </div>
  );
};

export default ProductDisplayPage;
