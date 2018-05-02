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


module.exports = router;