const express = require("express");
const app = express();

const body_parser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");
const port = process.env.PORT || 8000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "exam_system",
});

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/public/images")));
app.use(express.static(path.join(__dirname + "/public/css_files")));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

//examlist
app.get("/", (req, res) => {
  res.render("examlist");
});




app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
