const con = require("../connections/dbconnect");

const examlistGet = async (req, res) => {
  try {

    let [result] = await con.execute(
      `SELECT exam_id,exam_name,exam_time,exam_status  FROM exam`
    );
    if (result.length) {
      res.render("examlist", {
        result: result,
      });
    } else res.send("Data not found");
  } catch (err) {
    console.log(err);
  }
};


const studentdataGet = async (req, res) => {
  try {
    let id = req.query.id;
    let [result] = await con.execute(
    `select user_login.email, exam.exam_access_code from exam INNER join user_login ON user_login.user_id=exam.user_id where exam_id = ${id} AND exam.user_id = 1; `
    );

    res.send(result);

  } catch (err) {
    console.log(err);
  }
};



const setintervalGet = async (req,res) => {
res.render("setinterval");
};

module.exports = {
  examlistGet,
  studentdataGet,
  setintervalGet
};
