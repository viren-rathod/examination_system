const con = require("../connections/dbconnect");

const examlistGet = async (req, res) => {
  try {

    let [result] = await con.execute(
      `SELECT * FROM exam`
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
    
    let [result] = await con.execute(
    `select email from user_login  WHERE user_id = 1`
    );

    res.send(result);

  } catch (err) {
    console.log(err);
  }
};


const accesscodeGet = async (req,res) => {
 try{
  const id = req.query.id;
  console.log("id", id);
  let [examresult] = await con.execute(
    `select exam_access_code from exam WHERE exam_id = ${id}`
    );

    res.send(examresult);

 }catch(err){
  console.log(err);
 }
};


module.exports = {
  examlistGet,
  studentdataGet,
  accesscodeGet
};
