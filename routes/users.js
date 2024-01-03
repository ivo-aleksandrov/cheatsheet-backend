const express = require("express");
const router = express.Router();

const {
  getUser,
  verifyToken,
  logOut,
  logIn,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/users");

router.route("/api/getUser/:userName").get(getUser);
router.route("/api/verifytoken").get(verifyToken);
router.route("/api/logout").get(logOut);
router.route("/api/login").post(logIn);
router.route("/api/addUser").post(addUser);
router.route("/api/editUser").put (editUser);
router.route("/api/deleteUser/:id").delete(deleteUser);

module.exports = router;
