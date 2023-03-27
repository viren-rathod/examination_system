const express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sessions = require("express-session");
var cookie = require("cookie-parser");
var utils = require("util");
const { decode } = require("punycode");
let bodyParser = require("body-parser");
const mysql = require("mysql2");
const flash = require("connect-flash");
var nodemailer = require("nodemailer");
const app = express();
const ejs = require("ejs");
const { signedCookie } = require("cookie-parser");
const { Console } = require("console");
const path = require("path");
const PORT = 4321;

//set engines
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));
const exam = require("./routes/router");

//kevin
app.use(cookie());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const oneDay = 1000 * 60 * 60 * 24;
app.use(
    sessions({
        secret: "bhimanikevin",
        saveUninitialized: true,
        resave: false,
    })
);

app.use(express.static(path.join(__dirname + "../public")));
app.use(express.static(path.join(__dirname + "/public/images")));
app.use(express.static(path.join(__dirname + "/public/css")));
app.use(express.static(path.join(__dirname + "/public/js")));

app.use("/", exam);
app.listen(PORT, () => {
    console.log("Server running on port", PORT, "http://127.0.0.1:" + PORT);
});