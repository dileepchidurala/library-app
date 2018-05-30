const express = require("express");
var router = express.Router();
var db = require("../models/config");

const app = express();

//making connection with book database

router.get("/books", (req, res) => {
  db.lib_connection_test
    .then(conn => {
      var sql_query = "select * from library.books";
      var results = conn.query(sql_query);
      return results;
    })
    .then(rows => {
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
  // db.lib_connection.query(sql_query, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(result);
  // });
});

db.lib_connection.connect();

router.get("/avaliable_books", (req, res) => {
  var sql_query = "select * from library.books where status=1";
  db.lib_connection.query(sql_query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/reserved_books", (req, res) => {
  var sql_query = "select * from library.books where status=0";
  db.lib_connection.query(sql_query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
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
  db.lib_connection.query(sql_query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/reservation/:id", (req, res) => {
  db.lib_connection.query(
    "select * from library.books where id=" + req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result[0].status) {
        var sql_query =
          "update library.books set status=0 where id=" + req.params.id;
        db.lib_connection.query(sql_query, (err, result) => {
          if (err) {
            console.log(err);
          }
          res.send(result);
        });
      } else {
        console.log("Figure out how to send error to angular");
      }
    }
  );
});

router.get("/reinstate/:id", (req, res) => {
  var sql_query = "update library.books set status=1 where id=" + req.params.id;
  db.lib_connection.query(sql_query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  var sql_query = "delete from library.books where id=" + req.params.id;
  db.lib_connection.query(sql_query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

module.exports = router;
