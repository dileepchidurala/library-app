const express = require('express');
const mysql = require('mysql');
var router = express.Router();
// var db = require('../models/config');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'library'
});

const app = express();

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    console.log("mysql db connected");
});

router.get('/books',(req,res) =>{
    var sql_query = 'select * from library.books';
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    }); 
});

router.get('/avaliable_books',(req,res)=>{
    var sql_query='select * from library.books where status=1';
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/reserved_books',(req,res)=>{
    var sql_query='select * from library.books where status=0';
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/reservation/:id',(req,res)=>{
    var sql_query='update library.books set status=0 where id='+req.params.id;
    db.query(sql_query,(err,result) =>{
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.post('/addbook',(req,res)=>{
    var sql_query='insert into library.books values( null,'+ req.body.book_id +',\''+ req.body.book_name +'\',\''+ req.body.description +'\',\''+ req.body.author+'\',\''+req.body.publication+'\','+req.body.price+','+req.body.status+');';
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

module.exports = router;