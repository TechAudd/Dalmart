import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartItems, removeFromCart } from "../../Store/cartSlice";

import { Button } from "../../Components/ui/button";
import { Card, CardContent } from "../../Components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Components/ui/dialog";
import { baseURL } from "../Services/api";
import axios from "axios";

const CartScreen = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState();
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false);

  const handleClearCart = () => dispatch(clearCartItems());
  const onClickRemove = (id) => dispatch(removeFromCart(id));
  const getProduct = (qty, price) => qty * price;

  const handlePlaceOrder = async () => {
    const {
      data: { order },
    } = await axios.post(`${baseURL}/cart/rzpOrder`, { amount: totalPrice });

    const options = {
      key: "rzp_test_RLuthCgwOgOOwE",
      amount: totalPrice,
      currency: "INR",
      name: "Dal Mart",
      description: "Thank you for choosing Dal Mart",
      order_id: order.id,
      handler: function (response) {
        dispatch(clearCartItems());
      },
      prefill: {
        name: "Dal Mart",
        email: "naveen850850@gmail.com",
        contact: "9133430919",
      },
      notes: { address: "Razorpay Corporate Office" },
      theme: { color: "#387847" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const closeOrderPlacedModal = () => {
    setShowOrderPlacedModal(false);
    navigate("/menu");
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center ">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
        Your Cart 🛒
      </h2>

      {cartItems.length > 0 ? (
        <div className="w-full md:w-[60%]">
          <div className="space-y-4 ">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="shadow-md hover:shadow-lg transition rounded-xl"
              >
                <CardContent className="flex gap-4 items-center p-4">
                  {/* Product Image */}
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h5>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Qty: {item.qty} × ₹{item.price}
                    </p>
                  </div>

                  {/* Price + Actions */}
                  <div className="flex flex-col items-end justify-between h-full space-y-2">
                    <Button
                      //   variant="destructive"
                      className="text-red-600"
                      size="sm"
                      onClick={() => onClickRemove(item.id)}
                    >
                      Remove
                    </Button>
                    <p className="font-bold text-green-700">
                      ₹{getProduct(item.qty, item.price)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total Summary */}
          <div className="mt-6 p-5 border rounded-lg bg-green-50 shadow-md">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-green-700">₹{totalPrice}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <h2 className="text-xl font-medium text-gray-600">
            Cart Seems Empty !!
          </h2>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-green-700"
          >
            Browse Menu
          </Button>
        </div>
      )}

      {/* Order Placed Modal */}
      <Dialog
        open={showOrderPlacedModal}
        onOpenChange={setShowOrderPlacedModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-700">
              🎉 Order Placed
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-2">
            <p>Your order has been placed successfully!</p>
            <p className="font-bold">Token Number: {orderId}</p>
          </div>
          <DialogFooter>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={closeOrderPlacedModal}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartScreen;
