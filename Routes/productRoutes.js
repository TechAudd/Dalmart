const express = require("express");
const { listProducts, getProductById, getProductsByCategory, searchProducts } = require("../Controllers/productController");
const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.get("/category/:category_id", getProductsByCategory);
router.get("/search/query", searchProducts);


module.exports = router;
