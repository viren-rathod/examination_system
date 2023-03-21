const express = require("express");
const app = express();

var sessionstorage = require("sessionstorage");
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
  try {
    connection.query("select exam_id, exam_name,exam_time, exam_status from exam", (err,result) => {
      res.render("examlist", {
        result: result,
      });
    });
  } catch (err) {
    console.log(err);
  }
});
        
      

//student data
app.get("/studentdata", (req, res) => {
  let studentdata = "select * from user_login  WHERE user_id = 1";
  connection.query(studentdata, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

//exam data
app.get("/examdata", (req, res) => {
  const id = req.query.id;
  console.log("id", id);
  let examdata = `select * from exam WHERE exam_id = ${id}`;
  connection.query(examdata, (err, examresult) => {
    if (err) throw err;
    res.send(examresult);
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
