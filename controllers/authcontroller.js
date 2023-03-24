const con = require("../connections/dbconnect");

const examGet = async (req, res) => {
  try {
    const question_no = 1,
      category_id = req.query.category_id || 1; // Get the requested page number, default to 1 if not provided
    const question_per_page = 1; //* Limit || Number of questions to display per page
    const offset = (question_no - 1) * question_per_page;
    let exam_id = 1;
    let [exam] = await con.execute(
      `SELECT exam_name,total_questions,exam_time,exam_access_code FROM exam WHERE exam_id = '${exam_id}'`
    );
    // console.log(exam[0].total_questions);
    let [category] = await con.execute(
      `SELECT category_name,a.category_id,count(a.category_id) as no_of_question FROM category a, questions b WHERE a.category_id=b.category_id and a.category_id = '${category_id}'`
    );

    // console.log(answer);

    let [data] = await con.execute(
      `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM questions as a left join category as b on a.category_id=b.category_id where a.category_id=${category_id} LIMIT ${question_per_page} OFFSET ${offset}`
    );

    if (data.length) {
      res.render("exam_question", {
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
};
const categoryGet = async (req, res) => {
  let category_id = req.query.id;
  let question_no = 1;
  const question_per_page = 1; //* Limit || Number of questions to display per page
  let offset = (question_no - 1) * question_per_page;
  let exam_id = 1;

  let [category] = await con.execute(
    `SELECT category_name,a.category_id,count(a.category_id) as no_of_question FROM category a, questions b WHERE a.category_id=b.category_id and a.category_id = '${category_id}'`
  );

  let [data] = await con.execute(
    `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM questions as a left join category as b on a.category_id=b.category_id where a.category_id=${category_id} LIMIT ${question_per_page} OFFSET ${offset}`
  );
  // console.log("category :- ", category);
  res.json({ data, category, question_no });
};
const pagingGet = async (req, res) => {
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
    `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM questions as a left join category as b on a.category_id=b.category_id where a.category_id=${category_id} AND a.question_id=${req.query.question_no}`
  );
  // console.log('Data :- ',data);
  res.json(data, category[0].no_of_question, question_no);
};
const nextGet = async (req, res) => {
  let id = parseInt(req.query.id) + 1;
  let [question] = await con.execute(
    `SELECT * FROM questions WHERE question_id = ${id}`
  );
  // console.log(question);
  res.json(question);
};
const prevGet = async (req, res) => {
  let id = parseInt(req.query.id) - 1;
  let [question] = await con.execute(
    `SELECT * FROM questions WHERE question_id = ${id}`
  );
  res.json(question);
};
const answerPost = async (req, res) => {
  let b = req.body;
  // console.log('body',b);
  if (b.id) {
    let [check] = await con.execute(
      `SELECT user_answers FROM user_answers WHERE question_id=${b.id}`
    );
    if (check.length == 0) {
      let query = `INSERT INTO user_answers (user_id,exam_id, question_id,user_answers,marks) VALUES (1,1,${b.id},'${b.ans}',1)`;
      let [data] = await con.execute(query);
    } else {
      let query = `UPDATE user_answers SET user_answers='${b.ans}' WHERE question_id=${b.id}`;
      let [data] = await con.execute(query);
    }
  }
};
const getAns = async (req, res) => {
  let id = req.body;
  // console.log(id);
  let [q] = await con.execute(
    `SELECT user_answers FROM user_answers WHERE question_id = ${id[0].question_id}`
  );
  // console.log("Ans :- ",q);
  res.json(q);
};

const endExam = async (req, res) => {
  res.render("dummy");
};
// const exam_homepageGet = async (req, res) => {
//   const [result] = await con.execute(`select * from exam_system.questions;`)

//   res.render('dummy', { exam_que: result })
// }
module.exports = {
  examGet,
  answerPost,
  prevGet,
  nextGet,
  pagingGet,
  categoryGet,
  getAns,
  endExam,
};
