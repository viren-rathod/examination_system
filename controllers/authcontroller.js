const con = require("../connections/dbconnect");

const examGet = async (req, res) => {

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
  
      let [cat] = await con.execute(`select * from category`);
      // console.log(cat.length);
      // console.log(category[0].no_of_question);
      if (data.length) {
        res.render("categories", {
          e: data[0],
          exam: exam,
          category: category,
          cat,
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
      `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id} LIMIT ${question_per_page} OFFSET ${offset}`
    );
    // console.log("category :- ", category);
    res.json({ data, category, question_no });
  };

  module.exports = {
    examGet,
    categoryGet,
  };