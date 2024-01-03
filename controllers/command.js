const pool = require("../db/connect").pool;

const getCommands = function (req, res) {
  const { ID: ID } = req.params;

  const query = "SELECT * FROM CheatSheet.Command WHERE CATEGORY_ID = ?";

  pool.query(query, [ID], function (err, results) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ results });
  });
};

const getCommand = function (req, res) {
  const { ID: ID } = req.params;

  const query = "SELECT * FROM CheatSheet.Command WHERE ID = ?";

  pool.query(query, [ID], function (err, results) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ results });
  });
};

const addCommand = function (req, res) {
  const { DESCRIPTION, COMMAND, CATEGORY_ID } = req.body;

  const query =
    "INSERT INTO CheatSheet.Command (DESCRIPTION, COMMAND, CATEGORY_ID) VALUES (?, ?, ?)";

  pool.query(
    query,
    [DESCRIPTION, COMMAND, CATEGORY_ID],
    function (err, results, fields) {
      if (err) {
        const errorMessage = err.sqlMessage;
        res.status(500).json({ errorMessage });
        return;
      }

      res.status(200).json({ message: "The command has been added" });
    }
  );
};

const editCommand = function (req, res) {
  const { ID, DESCRIPTION, COMMAND, CATEGORY_ID } = req.body;

  const query =
    "UPDATE CheatSheet.Command SET DESCRIPTION = ?, COMMAND = ?, CATEGORY_ID = ? WHERE ID = ?";


  pool.query(
    query,
    [DESCRIPTION, COMMAND, CATEGORY_ID, ID],
    function (err, results, fields) {
      if (err) {
        const errorMessage = err.sqlMessage;
        res.status(500).json({ errorMessage });
        return;
      }
      console.log(query);
      res.status(200).json({ message: "The command has been updated" });
    }
  );
};

const deleteCommand = function (req, res) {
  const { ID: ID } = req.params;

  const query = "DELETE FROM CheatSheet.Command WHERE ID = ?";

  pool.query(query, [ID], function (err, results, fields) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ message: "The command has been deleted" });
  });
};

module.exports = {
  getCommands,
  getCommand,
  addCommand,
  editCommand,
  deleteCommand,
};
