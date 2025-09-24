const express = require("express");
const { listProducts, getProductById, getProductsByCategory } = require("../controllers/productController");
const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.get("/category/:category_id", getProductsByCategory);


module.exports = router;
