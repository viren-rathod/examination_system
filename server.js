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
  // res.redirect("/exam");
  res.render("quiz");
});

app.get("/exam", async (req, res) => {
  try {
    const question_no = 1,
      category_id = req.query.category_id || 1; // Get the requested page number, default to 1 if not provided
    const question_per_page = 1; //* Limit || Number of questions to display per page
    const offset = (question_no - 1) * question_per_page;
    let no_of_question;
    let exam_id = 1;

    let [exam] = await con.execute(
      `SELECT exam_name,total_questions,exam_time,exam_access_code FROM exam WHERE exam_id = '${exam_id}'`
    );
    let [category] = await con.execute(
      `SELECT category_name,a.category_id,count(a.category_id) as no_of_question FROM category a, questions b WHERE a.category_id=b.category_id and a.category_id = '${category_id}'`
    );

    let [data] = await con.execute(
      `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id} LIMIT ${question_per_page} OFFSET ${offset}`
    );
    console.log(category[0].no_of_question);
    if (data.length) {
      res.render("exam_question", {
        //Result,numberOfpage,page,numberOfperpage
        e: data[0],
        exam: exam,
        category: category,
        question_no,
        question_per_page,
      });
    } else res.send("Data not found");
  } catch (err) {
    console.log(err);
  }
});

app.get("/category", async (req, res) => {
  let category_id = req.query.id;
  let question_no = 1;
  const question_per_page = 1; //* Limit || Number of questions to display per page
  let offset = (question_no - 1) * question_per_page;
  let exam_id = 1;

  let [category] = await con.execute(
    `SELECT category_name,a.category_id,count(a.category_id) as no_of_question FROM category a, questions b WHERE a.category_id=b.category_id and a.category_id = '${category_id}'`
  );

  let [data] = await con.execute(
    `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id} LIMIT ${question_per_page} OFFSET ${offset}`
  );
  // console.log("category :- ", category);
  res.json({data, category, question_no});
});

app.get("/paging", async (req, res) => {
  const category_id = req.query.category_id || 1,
    question_no = req.query.question_no + 1;
  const question_per_page = 1; //* Limit || Number of questions to display per page
  const offset = (question_no - 1) * question_per_page;
  let no_of_question;
  let exam_id = 1;
  let [exam] = await con.execute(
    `SELECT exam_name,total_questions,exam_time,exam_access_code FROM exam WHERE exam_id = '${exam_id}'`
  );

  let [category] = await con.execute(
    `SELECT category_name,a.category_id,count(a.category_id) as no_of_question FROM category a, questions b WHERE a.category_id=b.category_id and a.category_id = '${category_id}'`
  );

  let [data] = await con.execute(
    `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id} AND a.question_id=${req.query.question_no}`
  );

  res.json(data, category[0].no_of_question, question_no);
});

app.get("/next", async (req, res) => {
  let id = parseInt(req.query.id) + 1;
  let [question] = await con.execute(
    `SELECT * FROM questions WHERE question_id = ${id}`
  );
  // console.log(question);
  res.json(question);
});
app.get("/prev", async (req, res) => {
  let id = parseInt(req.query.id) - 1;
  let [question] = await con.execute(
    `SELECT * FROM questions WHERE question_id = ${id}`
  );
  res.json(question);
});

//? Taking student's response
app.post("/answers", async (req, res) => {
  let b = req.body;
  console.log(b);
  // res.send(b);
});

// * testing
app.get("/quiz/:category_id", async (req, res) => {
  const category_id = req.params.category_id,
    currentPage = 1,
    totalPages = 5;

  try {
    const query = `
    SELECT question_text,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id}
    `;
    const [rows] = await con.execute(query, [category_id]);
    // const questions = rows.map((row) => ({ question_text: row.question_text }));
    // console.log(rows);
    res.render("quiz", { questions: rows, currentPage, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const port = 4321;
app.listen(port, () => {
  console.log("App started on port", port);
});
