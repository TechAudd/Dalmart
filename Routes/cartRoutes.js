const express = require("express");
const {
  getCart,
  updateCart,
  rzpOrderCreation,
} = require("../Controllers/cartController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

// router.use(authenticate);

router.get("/", getCart);
router.post("/", updateCart);
router.post("/rzpOrder", rzpOrderCreation);

module.exports = router;
