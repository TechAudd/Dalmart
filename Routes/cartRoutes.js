const express = require("express");
const { getCart, updateCart } = require("../controllers/cartController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authenticate);

router.get("/", getCart);
router.post("/", updateCart);

module.exports = router;
