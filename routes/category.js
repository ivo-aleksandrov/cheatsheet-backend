const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category");


router.route("/api/getCategories").get(getCategories);
router.route("/api/getCategory/:ID").get(getCategory);
router.route("/api/addCategory").post(addCategory);
router.route("/api/editCategory").post(editCategory);
router.route("/api/deleteCategory/:ID").delete(deleteCategory);

module.exports = router;
