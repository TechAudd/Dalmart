import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? { ...x, qty: x.qty + item.qty } : x
        );
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      updateCart(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateCartItems: (state, action) => {
      const { itemId, newQty } = action.payload;
      console.log(itemId, newQty);
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].qty = newQty;
      }

      updateCart(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, clearCartItems, removeFromCart, updateCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
