const pool = require("../db/connect").pool;
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUser = async function (req, res) {
  const { userName: userName } = req.params;

  const query = "SELECT * FROM Users WHERE UserName = ?";

  pool.query(query, [userName], function (err, results) {
    if (err) {
     const errorMessage = err.sqlMessage;
     res.status(500).json({ errorMessage });
     return;
    }

    if (results.length === 0) {
      res
        .status(401)
        .json({ message: "User with that username does not exists" });
      return;
    }

    const user = results[0];

    res.status(200).json({ user: user });
  });
};

const logIn = async function (req, res) {
  const { username, password } = req.body;

  const loginQuery = "SELECT * FROM Users WHERE UserName = ?";

  pool.query(loginQuery, [username], async function (err, results) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const comparison = await bcrypt.compare(password, results[0].Password);

    if (!comparison) {
      res.status(401).json({ message: "Password is wrong" });
      return;
    }

    const user = results[0];

    // Create a JWT token
    const token = jwt.sign({ userId: user.ID }, secretKey, {
      expiresIn: "1h",
    });

    const userToken = token;

    const updateQuery =
      "UPDATE Users SET LastToken = ?, LastTokenDate = CURRENT_TIMESTAMP() WHERE UserName = ?";

    pool.query(
      updateQuery,
      [userToken, username],
      function (err, results, fields) {
        if (err) {
          const errorMessage = err.sqlMessage;
          res.status(500).json({ errorMessage });
          return;
        }
      }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 6000000 });
    res.cookie("user", user.UserName, { httpOnly: false, maxAge: 6000000 });
    res.status(200).json({ message: "Authentication successful" });
  });
};

const verifyToken = async function (req, res) {
  const token = req.cookies.token;
  const username = req.cookies.user;

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to authenticate token" });
    }

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      user: username,
    });
  });
};

const logOut = async function (req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.cookie("user", "none", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out successful",
  });
};

const addUser = async function (req, res) {
  const { username, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query =
    "INSERT INTO Users (UserName, Password, UpdatedOn, CreatedOn, LastToken, LastTokenDate) VALUES (?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), null, null);";

  pool.query(
    query,
    [username, encryptedPassword],
    function (err, results, fields) {
      if (err) {
        const errorMessage = err.sqlMessage;
        res.status(500).json({ errorMessage });
        return;
      }

      res.status(200).json({ message: "The user has been added" });
    }
  );
};

const editUser = async function (req, res) {
  const { id, username, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query =
    "UPDATE Users SET UserName = ?, Password = ?, UpdatedOn = CURRENT_TIMESTAMP() WHERE ID = ?";

  pool.query(
    query,
    [username, encryptedPassword, id],
    function (err, results, fields) {
      if (err) {
         const errorMessage = err.sqlMessage;
         res.status(500).json({ errorMessage });
         return;
      }

      res.status(200).json({ message: "The user has been updated" });
    }
  );
};

const deleteUser = async function (req, res) {
  const { id: ID } = req.params;

  const query = "DELETE FROM Users WHERE ID = ?";

  pool.query(query, [ID], function (err, results, fields) {
    if (err) {
      const errorMessage = err.sqlMessage;
      res.status(500).json({ errorMessage });
      return;
    }

    res.status(200).json({ message: "The user has been deleted" });
  });
};

module.exports = {
  getUser,
  addUser,
  editUser,
  deleteUser,
  logIn,
  verifyToken,
  logOut,
};
