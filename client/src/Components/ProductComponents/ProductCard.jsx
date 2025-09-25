import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(1); // Start with 1 when added
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  return (
    <Card className="group flex justify-center items-center  w-full  !border-none rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden bg-white">
      <>
        {/* Image */}
        <div className="relative w-80 h-48 overflow-hidden">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="absolute top-3 right-3">
            {product.attributes?.organic ? (
              <Badge className="bg-green-600 text-white hover:bg-green-700 shadow-md">
                Organic
              </Badge>
            ) : (
              <Badge className="bg-gray-500 text-white shadow-md">
                Non-Organic
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {product.name}
          </CardTitle>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Nutrition info */}
          <div className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg">
            <span className="font-medium">Calories:</span>
            <span>{product.nutrition?.calories}</span>
          </div>

          {/* CTA */}
          {quantity !== 0 ? (
            <div className="w-full mt-3 flex items-center justify-between border border-green-600 rounded-lg px-3 py-2 shadow-md">
              <Button
                onClick={decreaseQty}
                className="text-green-600 text-xl font-bold px-2 hover:text-green-700 transition"
              >
                –
              </Button>
              <span className="text-lg font-semibold text-gray-800">
                {quantity}
              </span>
              <Button
                onClick={increaseQty}
                className="text-green-600 text-xl font-bold px-2 hover:text-green-700 transition"
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              className="w-full mt-3 border border-green-600 text-green-600 
             shadow-md rounded-lg 
             hover:bg-green-600 hover:text-white 
             hover:shadow-xl t"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </CardContent>
      </>
    </Card>
  );
};
