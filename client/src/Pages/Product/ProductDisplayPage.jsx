import ProductFilters from "../Components/ProductComponents/ProductFilters";
import { Button } from "../components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomLoader } from "../../Components/CommonComponents/Loader";
import { ProductCard } from "../../Components/ProductComponents/ProductCard";
import { useListProductsQuery } from "../../Services/productApiSlice";

const ProductDisplayPage = () => {
  const navigate = useNavigate();
  const [isOrganic, setIsOrganic] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortValue, setSortValue] = useState("relevance");
  const [searchKey,setSearchKey] = useState('')
  const [searchTrigger, setSearchTrigger] = useState(false);

  const {
    data: productList,
    isLoading: isProductListLoading,
    isError: productListFetchError,
    refetch: productListRefetch,
  } = useListProductsQuery({search:searchKey}, { skip: !searchTrigger && searchKey !== "" });

useEffect(() => {
  if (!productList) return;

  // helper to extract numeric price from different shapes
  const getPrice = (item) => {
    const raw =
      item?.price ??
      item?.attributes?.price ??
      (item?.variants && item.variants[0] && item.variants[0].price) ??
      0;

    // handle strings like "420.00" or "1,234.50"
    if (typeof raw === "string") {
      return parseFloat(raw.replace(/,/g, "")) || 0;
    }
    return Number(raw) || 0;
  };

  // 1. start from original productList to preserve 'relevance' order
  let updatedList = productList.slice(); // shallow copy

  // 2. filter (organic)
  if (isOrganic) {
    updatedList = updatedList.filter((item) => Boolean(item?.attributes?.organic));
  }

  // 3. sort based on sortValue
  if (sortValue === "low-to-high") {
    // use a copy to avoid mutating upstream arrays
    updatedList = updatedList.slice().sort((a, b) => getPrice(a) - getPrice(b));
  } else if (sortValue === "high-to-low") {
    updatedList = updatedList.slice().sort((a, b) => getPrice(b) - getPrice(a));
  } // relevance => keep original order

  setFilteredProducts(updatedList);
}, [isOrganic, sortValue, productList]);

const searchClicked = () => {
  setSearchTrigger(true);
  productListRefetch(); // will call API with current searchKey
};

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

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
       <div className="px-4 sm:px-6 lg:px-12 py-8 relative">
      {/* Sticky filter bar */}
      <div className="sticky top-10 z-50 bg-white shadow-md rounded-b-lg">
        <ProductFilters
          isOrganic={isOrganic}
          setIsOrganic={setIsOrganic}
          setSortValue={setSortValue}
          sortValue={sortValue}
          searchClicked={searchClicked}
          setSearchKey={setSearchKey}
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <p className="text-lg">No products available</p>
      </div>
       </div>
    );
  }



  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 relative">
      {/* Sticky filter bar */}
      <div className="sticky top-10 z-50 bg-white shadow-md rounded-b-lg">
        <ProductFilters
          isOrganic={isOrganic}
          setIsOrganic={setIsOrganic}
          setSortValue={setSortValue}
          sortValue={sortValue}
          searchClicked={searchClicked}
          setSearchKey={setSearchKey}
        />
      </div>

      <h1 className="text-2xl font-bold mb-6 text-gray-800 mt-10">
        What would you like to shop!
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((productInfo) => (
          <ProductCard key={productInfo.id} product={productInfo} />
        ))}
      </div>

      {/* Floating cart button */}
      <button
        onClick={() => navigate("/cart")}
        className="fixed bottom-10 right-10 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition transform hover:scale-110 active:scale-95"
      >
        <ShoppingCart size={24} />
      </button>
    </div>
  );
};

export default ProductDisplayPage;
