import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CartPage from "./Pages/Product/CartPage";
import ProductDisplayPage from "./Pages/Product/ProductDisplayPage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductDisplayPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};
