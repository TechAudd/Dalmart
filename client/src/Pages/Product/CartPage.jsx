import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state);
  console.log({ cart });
  return <div></div>;
};

export default CartPage;
