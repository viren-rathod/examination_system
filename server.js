const express = require("express");
const app = express();


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const sessions = require('express-session');
var cookie = require('cookie-parser');
var utils = require('util');
const { decode } = require('punycode');
let bodyParser = require('body-parser')
const mysql = require('mysql2');
const flash = require('connect-flash');
var nodemailer = require('nodemailer');

app.use(express.static('public'));
const ejs = require('ejs');
const { signedCookie } = require('cookie-parser');
const { Console } = require('console');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


const router = require('./routes/router');

//kevin
app.use(cookie());
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "bhimanikevin",
    saveUninitialized: true,
    resave: false
}));

//router routes
app.use('/', router);


const PORT = 4322;
app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})