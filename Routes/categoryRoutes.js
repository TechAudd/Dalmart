const express = require("express");
const { listCategories, getCategoryById, searchCategories} = require("../Controllers/categoryController");
const router = express.Router();

router.get("/", listCategories);
router.get("/:id", getCategoryById);
router.get("/search/query", searchCategories);

module.exports = router;
