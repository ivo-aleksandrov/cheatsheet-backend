const pool = require("../db/connect").pool;

const getCategories = function (req, res) {
  const query = "SELECT * FROM CheatSheet.Category";

  pool.query(query, function (err, results) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ results });
  });
};

const getCategory = function (req, res) {
  const { ID: ID } = req.params;

  const query = "SELECT * FROM CheatSheet.Category WHERE ID = ?";

  pool.query(query, [ID], function (err, results) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ results });
  });
};

const addCategory = function (req, res) {
  const { NAME, ICON } = req.body;

  const query = "INSERT INTO CheatSheet.Category (NAME, ICON) VALUES (?, ?)";

  pool.query(query, [NAME, ICON], function (err, results, fields) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ message: "The category has been added" });
  });
};

const editCategory = function (req, res) {
  const { NAME, ID } = req.body;

  const query =
    "UPDATE CheatSheet.Category SET NAME = ? WHERE ID = ?";

  pool.query(query, [NAME, ID], function (err, results, fields) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ message: "The category has been updated" });
  });
};

const deleteCategory = function (req, res) {
  const { ID: ID } = req.params;

  const query = "DELETE FROM CheatSheet.Category WHERE ID = ?";

  pool.query(query, [ID], function (err, results, fields) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ message: "The category has been deleted" });
  });
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
