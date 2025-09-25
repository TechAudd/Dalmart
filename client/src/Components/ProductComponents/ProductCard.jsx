import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProductCard = ({ product }) => {
  return (
    <Card className="group !border-none w-80 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden bg-white">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
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
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
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
        <Button
          className="w-full mt-3 border border-green-600 text-green-600 
             shadow-md rounded-lg 
             hover:bg-green-600 hover:text-white 
             hover:shadow-xl t"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};
