import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartItems, removeFromCart } from "../../Store/cartSlice";
// import { useCreateOrderMutation } from "../slices/ordersApiSlice";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { baseURL } from "@/Services/api";
import axios from "axios";

const CartScreen = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  //   const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   const [placeOrder] = useCreateOrderMutation();
  const [orderId, setOrderId] = useState();
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false);

  const handleClearCart = () => dispatch(clearCartItems());
  const onClickRemove = (id) => dispatch(removeFromCart(id));

  const getProduct = (qty, price) => qty * price;

  const extractOrderId = (input) => {
    const match = input.match(/order(\d+)/);
    if (match && match[1]) setOrderId(match[1]);
  };

  const handlePlaceOrder = async () => {
    // const {
    //   data: { key },
    // } = await axios.get(`${baseURL}/api/getkey`);
    const {
      data: { order },
    } = await axios.post(`${baseURL}/cart/rzpOrder`, {
      amount: totalPrice,
    });

    const options = {
      key: "rzp_test_RLuthCgwOgOOwE", // ✅ only public key
      amount: totalPrice,
      currency: "INR",
      name: "Dal Mart",
      description: "Thank you for Choosing Dal Mart",
      order_id: order.id, // ✅ must be generated on server
      handler: function (response) {
        console.log("Payment successful!", response);
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

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const closeOrderPlacedModal = () => {
    setShowOrderPlacedModal(false);
    navigate("/menu");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Cart</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item._id} className="bg-green-100">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <h5 className="text-lg font-semibold">{item.item}</h5>
                    <p>Price: ₹{item.price}</p>
                    <p>
                      Quantity: {item.qty} x {item.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onClickRemove(item._id)}
                    >
                      Remove
                    </Button>
                    <p className="font-bold">
                      {getProduct(item.qty, item.price)}/-
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 p-4 border-2 border-green-500 rounded bg-green-100 text-right">
            <p className="font-bold text-lg">Total</p>
            <p className="text-lg">{totalPrice}</p>
          </div>

          <div className="mt-6 flex space-x-4">
            <Button
              variant="outline-destructive"
              className="flex-1"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
            <Button
              variant="outline-success"
              className="flex-1"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <h2 className="text-xl">Cart Seems Empty !!</h2>
          <Button
            variant="outline"
            onClick={() => navigate("/menu")}
            className="border-green-700"
          >
            Menu
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
            <DialogTitle>Order Placed</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p>Your order has been placed successfully!</p>
            <p className="font-bold">Token Number: {orderId}</p>
          </div>
          <DialogFooter>
            <Button variant="outline-success" onClick={closeOrderPlacedModal}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartScreen;
