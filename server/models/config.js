const mysql = require("mysql");
var mysql_test = require("promise-mysql");

const lib_connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "library"
});

const lib_connection_test = mysql_test.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "library"
});

module.exports.lib_connection = lib_connection;
module.exports.lib_connection_test = lib_connection_test;
