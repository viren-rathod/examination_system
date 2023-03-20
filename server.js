const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// console.log(__dirname + '/public');
const mysql2 = require("mysql2/promise");
const con = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "exam_system",
});
app.use(cors());

app.get("/", (req, res) => {
  res.redirect("/exam");
});
app.get("/exam", async (req, res) => {
  try {
    const question_no = 1,
      category_id = 1; // Get the requested page number, default to 1 if not provided
    const question_per_page = 1; //* Limit || Number of questions to display per page
    const offset = (question_no - 1) * question_per_page;
    let no_of_question;
    let exam_id = 1;

    let [exam] = await con.execute(
      `SELECT exam_name,total_questions,exam_time,exam_access_code FROM exam WHERE exam_id = '${exam_id}'`
    );
    let [category] = await con.execute(
      `SELECT category_name,category_id FROM category WHERE category_id = '${category_id}'`
    );
    let [records] = await con.execute(
      `SELECT question_text,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id}`
    );
    let numberOfRecords = records.length;
    no_of_question = Math.ceil(numberOfRecords / question_per_page);

    let [data] = await con.execute(
      `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id} LIMIT ${question_per_page} OFFSET ${offset}`
    );
    // console.log(category);
    if (data.length) {
      res.render("exam_question", {
        //Result,numberOfpage,page,numberOfperpage
        e: data[0],
        exam: exam,
        category: category,
        no_of_question,
        question_no,
        question_per_page,
      });
    } else res.send("Data not found");
  } catch (err) {
    console.log(err);
  }
});

app.get("/paging", async (req, res) => {
  const category_id = 1,
    question_no = req.query.question_no; // Get the requested page number, default to 1 if not provided
  const question_per_page = 1; //* Limit || Number of questions to display per page
  const offset = (question_no - 1) * question_per_page;
  let no_of_question;
  let exam_id = 1;

  let [exam] = await con.execute(
    `SELECT exam_name,total_questions,exam_time,exam_access_code FROM exam WHERE exam_id = '${exam_id}'`
  );
  let [category] = await con.execute(
    `SELECT category_name FROM category WHERE category_id = '${category_id}'`
  );
  let [records] = await con.execute(
    `SELECT question_text,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id}`
  );
  let numberOfRecords = records.length;
  no_of_question = Math.ceil(numberOfRecords / question_per_page);

  let [data] = await con.execute(
    `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id} LIMIT ${question_per_page} OFFSET ${offset}`
  );
  res.json(data, no_of_question, question_no);
});

app.get("/next", async (req, res) => {
  let id = parseInt(req.query.id) + 1;
  let [question] = await con.execute(
    `SELECT * FROM questions WHERE question_id = ${id}`
  );
  res.json(question);
});
app.get("/previous", async (req, res) => {
  let id = parseInt(req.query.id) - 1;
  console.log(`SELECT * FROM questions WHERE question_id = ${id}`);
  let [question] = await con.execute(
    `SELECT * FROM questions WHERE question_id = ${id}`
  );
  // res.json(question);
});

//? Taking student's response
app.post("/answers", async (req, res) => {
  let b = req.body;
  console.log(b);
  // res.send(b);
});

app.get("/test", () => {});
const port = 4321;
app.listen(port, () => {
  console.log("App started on port", port);
});
