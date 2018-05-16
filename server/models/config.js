const mysql = require("mysql");

const lib_connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "library"
});

module.exports.lib_connection = lib_connection;
