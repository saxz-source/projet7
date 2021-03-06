const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mysql =require('mysql');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet")

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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.options('http://localhost:3000', cors());

app.use(helmet())

app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Implémentation des routes "users"
const userRoutes = require('./routes/users');

app.use('/auth', userRoutes);

// Implémentation des routes "posts"
const postsRoutes = require('./routes/posts');

app.use('/posts', postsRoutes);


module.exports = app;
