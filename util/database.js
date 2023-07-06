const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "Node JS",
  password: 8055, //your database's root passowrd here
});

module.exports = pool.promise();
