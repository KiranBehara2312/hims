const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
});

const promisePool = pool.promise();

module.exports = {
  query: async (sql, params) => {
    try {
      const [rows] = await promisePool.query(sql, params);
      return rows;
    } catch (err) {
      console.error("Database query error:", err.message);
      throw err;
    }
  },
  close: async () => {
    try {
      await pool.end();
      console.log("Database pool closed");
    } catch (err) {
      console.error("Error closing the database pool:", err.message);
    }
  },
};
