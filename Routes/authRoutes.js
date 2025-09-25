const express = require("express");
const {
  requestOtp,
  verifyOtp,
  loginWithPassword,
} = require("../Controllers/authController");

const router = express.Router();

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginWithPassword);

module.exports = router;
