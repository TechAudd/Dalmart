import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductDisplayPage from "./Pages/Product/ProductDisplayPage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductDisplayPage />} />
      </Routes>
    </Router>
  );
};
