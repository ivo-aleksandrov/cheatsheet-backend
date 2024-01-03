require("dotenv").config();

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.DB_Database,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  queueLimit: 0,
});

// Function to check the database connection
function checkDbConnection() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      process.exit(1);
    }
    console.log("Database connection is successful!");
    connection.release(); // Release the connection
  });
}

// Export the pool and the checkDbConnection function
module.exports = {
  pool,
  checkDbConnection,
};
