import { Badge } from "../Components/ui/badge";
import { Button } from "../Components/ui/button";
import { Card, CardContent } from "../Components/ui/card";
import { addToCart, removeFromCart } from "../Store/cartSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const cart = useSelector((state) => state.cart);
  console.log({ cart });
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setQuantity(1);
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
    dispatch(addToCart({ ...product, qty: 1 })); // increment by 1
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      dispatch(addToCart({ ...product, qty: -1 })); // reduce by 1
    } else {
      setQuantity(0);
      dispatch(removeFromCart(product._id));
    }
  };

  return (
    <Card className="group w-full !border-none rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden bg-white">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge
            className={`shadow-md ${
              product.attributes?.organic
                ? "bg-green-600 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {product.attributes?.organic ? "Organic" : "Non-Organic"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-4">
        {/* Name & Brand */}
        <div className="flex  xs:flex-row xs:justify-between xs:items-center gap-1">
          <div className="w-[50%]">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          <div className="flex flex-col items-end items-baseline gap-1 w-[50%]">
            <span className="text-lg font-semibold text-green-600">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500">per/kg</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Nutrition */}
        <div className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg">
          <span className="font-medium">Calories:</span>
          <span>{product.nutrition?.calories}</span>
        </div>

        {/* CTA */}
        {quantity !== 0 ? (
          <div className="w-full flex items-center justify-between border border-green-600 rounded-lg px-3 py-2 shadow-md mt-2">
            <Button
              onClick={decreaseQty}
              className="text-green-600 text-xl font-bold px-3 hover:text-green-700 transition"
            >
              –
            </Button>
            <span className="text-lg font-semibold text-gray-800">
              {quantity}
            </span>
            <Button
              onClick={increaseQty}
              className="text-green-600 text-xl font-bold px-3 hover:text-green-700 transition"
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full mt-2 border border-green-600 text-green-600 shadow-md rounded-lg hover:bg-green-600 hover:text-white hover:shadow-xl transition"
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>

    // <Card className="group flex justify-center items-center  w-full  !border-none rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden bg-white">
    //   <>
    //     {/* Image */}
    //     <div className="relative w-80 h-48 overflow-hidden">
    //       <img
    //         src={product.images?.[0]}
    //         alt={product.name}
    //         className="w-full h-full object-cover rounded-t-2xl"
    //       />
    //       <div className="absolute top-3 right-3">
    //         {product.attributes?.organic ? (
    //           <Badge className="bg-green-600 text-white hover:bg-green-700 shadow-md">
    //             Organic
    //           </Badge>
    //         ) : (
    //           <Badge className="bg-gray-500 text-white shadow-md">
    //             Non-Organic
    //           </Badge>
    //         )}
    //       </div>
    //     </div>

    //     {/* Content */}
    //     <CardHeader className="flex justify-between items-center px-3 pt-3">
    //       {/* Left: Name + Brand */}
    //       <div className="flex flex-col">
    //         <CardTitle className="text-lg font-semibold text-gray-900">
    //           {product.name}
    //         </CardTitle>
    //         <span className="text-sm text-gray-500 mt-1">{product.brand}</span>
    //       </div>

    //       {/* Right: Price */}
    //       <div className="flex flex-col items-end">
    //         <span className="text-lg font-bold text-green-600">
    //           ₹{product.price}
    //         </span>
    //         <span className="text-xs text-gray-400">per/kg</span>
    //       </div>
    //     </CardHeader>

    //     <CardContent className="space-y-3">
    //       <p className="text-sm text-gray-600 line-clamp-2">
    //         {product.description}
    //       </p>

    //       {/* Nutrition info */}
    //       <div className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg">
    //         <span className="font-medium">Calories:</span>
    //         <span>{product.nutrition?.calories}</span>
    //       </div>

    //       {/* CTA */}
    //       {quantity !== 0 ? (
    //         <div className="w-full mt-3 flex items-center justify-between border border-green-600 rounded-lg px-3 py-2 shadow-md">
    //           <Button
    //             onClick={decreaseQty}
    //             className="text-green-600 text-xl font-bold px-2 hover:text-green-700 transition"
    //           >
    //             –
    //           </Button>
    //           <span className="text-lg font-semibold text-gray-800">
    //             {quantity}
    //           </span>
    //           <Button
    //             onClick={increaseQty}
    //             className="text-green-600 text-xl font-bold px-2 hover:text-green-700 transition"
    //           >
    //             +
    //           </Button>
    //         </div>
    //       ) : (
    //         <Button
    //           className="w-full mt-3 border border-green-600 text-green-600
    //          shadow-md rounded-lg
    //          hover:bg-green-600 hover:text-white
    //          hover:shadow-xl t"
    //           onClick={handleAddToCart}
    //         >
    //           Add to Cart
    //         </Button>
    //       )}
    //     </CardContent>
    //   </>
    // </Card>
  );
};
