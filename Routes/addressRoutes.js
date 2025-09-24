const express = require("express");
const { listAddresses, addAddress } = require("../controllers/addressController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authenticate);

router.get("/", listAddresses);
router.post("/", addAddress);

module.exports = router;
