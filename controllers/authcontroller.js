
const con = require("../connections/dbconnect.js");
var utils = require("util");
const { decode } = require("punycode");
const flash = require("connect-flash");
var nodemailer = require("nodemailer");
const { signedCookie } = require("cookie-parser");
const { Console } = require("console");
const bcrypt = require("bcryptjs");






const form1= async (req, res) => {
  try{
      let [sql1]=await con.execute(`select exam_id,exam_name,exam_access_code,total_questions,exam_time,user_id,exam_status from exam`)
      console.log(sql1)

    


      let sql=`select name,email,contact,gender,city,college_name from student INNER JOIN colleges on  colleges.college_id=student.college_id where student_id=1`;
      let [data]=await con.execute(sql)
      console.log(data[0])
      let result=data[0]
      let user_email=result.email

      // -----------------------mail access code-
      let access_code=`select exam_access_code from exam inner join user_login on  user_login.user_id= exam.user_id  where user_login.email='vrn@mail.com';`
      let result1=await con.execute(access_code);
      console.log(result1[0][0].exam_access_code);
      let code=result1[0][0].exam_access_code
      console.log(access_code)
      
  res.render("examlist",{sql:sql1,result , access_code})
  // res.render("form",{result})

  }
  catch(exception){
      console.log("Error: ",exception)
  }
}


const validate_code=async(req,res)=>{
  let email=req.query.email;
  console.log("Email: ",email);
  let sql11=`select exam_access_code from exam inner join user_login on  user_login.user_id= exam.user_id  where user_login.email='${email}'`;
  console.log(sql11);
  let verify=await con.execute(sql11)
  console.log("cod hai");
  console.log(verify);
  res.json(verify)

}






module.exports={

  form1,validate_code
  }
