const express = require("express");
const { listCategories, getCategoryById } = require("../controllers/categoryController");
const router = express.Router();

router.get("/", listCategories);
router.get("/:id", getCategoryById);

module.exports = router;
