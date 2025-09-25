export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate the items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Updating Cart Items Price
  state.totalPrice = Number(state.itemsPrice).toFixed(2);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
