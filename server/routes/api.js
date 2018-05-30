const express = require("express");
var router = express.Router();
var db = require("../models/config");

var router_function = (req, res, query) => {
  db.lib_connection
    .then(conn => {
      var results = conn.query(query);
      return results;
    })
    .then(rows => {
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
};

router.get("/books", (req, res) => {
  router_function(req, res, "select * from library.books");
});

router.get("/reserved_books", (req, res) => {
  router_function(req, res, "select * from library.books where status=0");
});

router.get("/avaliable_books", (req, res) => {
  router_function(req, res, "select * from library.books where status=1");
});

router.get("/notavaliable_books", (req, res) => {
  router_function(req, res, "select * from library.books where status=2");
});

router.post("/addbook", (req, res) => {
  var sql_query =
    "insert into library.books values( null," +
    req.body.book_id +
    ",'" +
    req.body.book_name +
    "','" +
    req.body.description +
    "','" +
    req.body.author +
    "','" +
    req.body.publication +
    "'," +
    req.body.price +
    "," +
    req.body.status +
    ");";
  router_function(req, res, sql_query);
});

router.get("/reservation/:id", (req, res) => {
  db.lib_connection
    .then(conn => {
      var result = conn.query(
        "select * from library.books where id=" + req.params.id
      );
      return result;
    })
    .then(record => {
      if (!record.length) {
        throw "Sorry this book was Removed recently";
      } else if (record[0].status) {
        router_function(
          req,
          res,
          "update library.books set status=0 where id=" + req.params.id
        );
      } else {
        throw "Sorry This book is already reserved,ohhh you are few seconds late";
      }
    })
    .catch(error => {
      console.error(error);
    });
});

router.get("/reinstate/:id", (req, res) => {
  var sql_query = "update library.books set status=1 where id=" + req.params.id;
  router_function(req, res, sql_query);
});

router.get("/notavaliable/:id", (req, res) => {
  var sql_query = "update library.books set status=2 where id=" + req.params.id;
  router_function(req, res, sql_query);
});

router.delete("/delete/:id", (req, res) => {
  var sql_query = "delete from library.books where id=" + req.params.id;
  router_function(req, res, sql_query);
});

module.exports = router;
