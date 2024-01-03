const express = require("express");
const app = express();

require("dotenv").config();
const { checkDbConnection } = require("./db/connect");
const port = process.env.APP_Port;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const users = require("./routes/users");
const category = require("./routes/category");
const command = require("./routes/command");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// users routes
app.get("/api/getUser/:userName", users);
app.get("/api/verifytoken", users);
app.get("/api/logout", users);
app.post("/api/login", users);
app.post("/api/addUser", users);
app.put("/api/editUser", users);
app.delete("/api/deleteUser/:id", users);

// Category routes 
app.get("/api/getCategories", category);
app.get("/api/getCategory/:ID", category);
app.post("/api/addCategory", category);
app.post("/api/editCategory", category);
app.delete("/api/deleteCategory/:ID", category);

// Command routes
app.get("/api/getCommands/:ID", command);
app.get("/api/getCommand/:ID", command);
app.post("/api/addCommand", command);
app.post("/api/editCommand", command);
app.delete("/api/deleteCommand/:ID", command);

const start = async () => {
  try {
    checkDbConnection();

    app.listen(port, console.log(`The backend app is working on port ${port}!`));
  } catch (error) {}
};

start();
