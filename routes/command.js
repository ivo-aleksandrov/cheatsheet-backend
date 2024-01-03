const express = require("express");
const router = express.Router();

const {
  getCommands,
  getCommand,
  addCommand,
  editCommand,
  deleteCommand,
} = require("../controllers/command");

router.route("/api/getCommands/:ID").get(getCommands);
router.route("/api/getCommand/:ID").get(getCommand);
router.route("/api/addCommand").post(addCommand);
router.route("/api/editCommand").post(editCommand);
router.route("/api/deleteCommand/:ID").delete(deleteCommand);

module.exports = router;
