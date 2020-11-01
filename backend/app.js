const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mysql =require('mysql');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({path: "./.env"});


const db = mysql.createConnection({
    host : process.env.DATABASE_H,
    user : process.env.DATABASE_U,
    password: process.env.DATABASE_P,
    database:process.env.DATABASE
});


app.use(express.urlencoded({extended:false})); //Parse url encoded bodies
app.use(express.json()); // Parse json bodies


db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})


/*
    db.query("CREATE DATABASE IF NOT EXISTS groupomania", (err, result) => {
      if (err) throw err;
      console.log("Database created");
    });
 
      db.query(`CREATE TABLE IF NOT EXISTS users(
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(30) NOT NULL,
        password VARCHAR(100) NOT NULL,
        fullName VARCHAR(51) NOT NULL,
        role VARCHAR(5),
        PRIMARY KEY (id)
    )`, (err, result) => {
        if (err) throw err;
        console.log("table USERS created");
    });  

    db.query(`CREATE TABLE IF NOT EXISTS posts(
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_author INT NOT NULL,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        title TINYTEXT NOT NULL,
        category VARCHAR(10) NOT NULL,
        content TEXT,
        media VARCHAR(100),
        comments_number INT,
        visibility TINYINT NOT NULL DEFAULT 1,
        PRIMARY KEY (id)
    )`, (err, result) => {
        if (err) throw err;
        console.log("table POSTS created");
    }); 

    db.query(`CREATE TABLE IF NOT EXISTS comments(
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        id_commentAuthor INT NOT NULL,
        id_post INT NOT NULL,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        comment_content VARCHAR(500) NOT NULL ,
        visibility TINYINT NOT NULL DEFAULT 1,
        PRIMARY KEY (id)
    )`, (err, result) => {
        if (err) throw err;
        console.log("table COMMENTS created");
    });
    
  });
*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.options('http://localhost:3000', cors());

app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Implémentation des routes "users"
const userRoutes = require('./routes/users');

app.use('/auth', userRoutes);

// Implémentation des routes "posts"
const postsRoutes = require('./routes/posts');

app.use('/posts', postsRoutes);


module.exports = app;
