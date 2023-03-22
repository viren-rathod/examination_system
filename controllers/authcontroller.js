
const con = require("../connections/dbconnect.js");
var utils = require("util");
const { decode } = require("punycode");
const flash = require("connect-flash");
var nodemailer = require("nodemailer");
const { signedCookie } = require("cookie-parser");
const { Console } = require("console");
const bcrypt = require("bcryptjs");

// var con.execute = utils.promisify(con.query).bind(con);

//register get function
const registerpage = async(req, res) => {
    var selectState = `select state_name from state `;
    var [stateResult] = await con.execute(selectState); //

    var selectCity = `select city_name from city where state_id = 1`;
    var [cityResult] = await con.execute(selectCity);

    var selectCollege = `select * from colleges`;
    var [collegeResult] = await con.execute(selectCollege);

    res.render("register", {
        stateResult: stateResult,
        cityResult: cityResult,
        collegeResult: collegeResult,
    });
};

//register post function
const registerpost = async(req, res) => {
    var fname = req.body.fname,
        lname = req.body.lname,
        email = req.body.email,
        password = req.body.password,
        address = req.body.address,
        gender = req.body.gender,
        phoneN = req.body.phoneN,
        state = req.body.state,
        city = req.body.city,
        college = req.body.college;

    var snum = await bcrypt.genSalt(10);
    var passwordStrong = await bcrypt.hash(password, snum);

    var selectQuery = `SELECT * FROM student where email = '${email}' `;
    var [selectResult] = await con.execute(selectQuery);

    var stateId = `select state_id from state where state_name ='${state}'`;
    var [sid] = await con.execute(stateId);

    var collegeId = `select college_id from colleges where college_name = '${college}'`;
    var [cid] = await con.execute(collegeId);

    if (selectResult.length != 0) {
        return res.send("This Email is already Exectute");
    } else {
        var insertQuery = `INSERT INTO student (name, contact , email, password, address ,gender ,state_id , city , college_id , student_status,created_date ) VALUES ('${fname}', '${phoneN}','${email}','${passwordStrong}','${address}', '${gender}'  ,'${sid[0].state_id}', '${city}' , '${cid[0].college_id}' , '0',NOW() )`;
        var [insertResult] = await con.execute(insertQuery);

        var insrertRole = `Insert into user_login (email , password , role , user_login_status,created_date) values ('${email}' , '${passwordStrong}' , '0' , '0',NOW())`;
        var [roleResult] = await con.execute(insrertRole);

        req.session.email = email;

        res.render("login", { msg: "" });
    }
};

//login get user
const logingetpage = async(req, res) => {
    res.render("login", { msg: "" });
};

//login post user
const loginpostpage = async(req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var selectEmail = `SELECT email, password FROM student where email = '${email}' `;
    var [emailResult] = await con.execute(selectEmail);

    var selectUser = `SELECT email, password , user_login_status  , role from user_login where email = '${email}'`;
    var [userData] = await con.execute(selectUser);

    if (userData.length == 0) {
        // res.send("email is not match");
        res.render("login", { msg: "email or pasword does not match" });
    } else {
        var comparePassword = userData[0].password;

        var compare = await bcrypt.compare(password, comparePassword);
        var resultRandom = Math.random().toString(36).substring(2, 7);
        console.log("Viren@123 :- ", compare);
        if (!compare) {
            // res.send("Password is not match");
            res.render("login", { msg: "email or pasword does not match" });
        } else {
            if (userData[0].user_login_status == 0) {
                res.render("activation.ejs", {
                    email: email,
                    resultRandom: resultRandom,
                });
            } else {
                req.session.email = email;
                res.redirect("/home");
            }
        }
    }
};

const forgetGet = async(req, res, next) => {
    res.render("validEmail");
};

// page of set password get
const setPasswordGet = async(req, res, next) => {
    res.redirect("/login");
};

// page of set password post
const setPasswordPost = async(req, res, next) => {
    res.render("setPassword");
};

// generate otp function random function
function generateOTP() {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// city function
const city = async(req, res) => {
    var state = req.query.state;

    var stateId = `select state_id from state where state_name= '${state}'`;
    var [sid] = await con.execute(stateId);

    var [result9] = await con.query(
        `select city_name from city where state_id = '${sid[0]["state_id"]}'`
    );

    res.json({ result9 });
};

//!-----------sendopt function---------------------

const sendOtp = async(req, res, next) => {
    var email = req.body.email;
    console.log("Send email in post method", email);
    let testAccount = nodemailer.createTestAccount();
    var otp = generateOTP();
    console.log("otp", otp);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            type: "OAUTH2",
            user: "patelnokano000@gmail.com",
            clientId: "67052588834-mk4nh286olopiqjo696603gb0pfkpicm.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04us9E3b_ARjICgYIARAAGAQSNwF-L9IrPSpdH05Mzzl8BuxFOyRDE0lsDzRRfMdEg2jQA_uFDp7G4que8m713t_5q1CjRlSK8qY",
            accessToken: "ya29.a0AVvZVspJqb2vWNPWa55TrdhaULzKmGSJOEsiZF-ctCG4GxpqNzI7cHKiG1CAJr1CkWbpm-EytloslaQfHQLpoZJJyR0wFJYzqwD4F65wZwaYVHvNx3SIznPvddsuorAivrditj4xvnxLip4KYy_-14DYlANRaCgYKARYSARISFQGbdwaIV0_DBqtSOLdypveodSvlrA0163",
        },
    });

    let info = transporter.sendMail({
        from: "hello <patelnokano000@gmail.com>", // sender address
        to: email, // list of receivers
        subject: "OTP Validation ✔", // Subject line
        text: "OTP", // plain text body
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />EsparkBiz</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
    });
    req.session.email = email;
    res.json({
        otp,
    });
};

// UPDATE PASSWORD GET request
const updatePasswordGet = async(req, res) => {
    // res.redirect("/login");
    res.render("login", { msg: "" });
};

// update password post request
const updatePasswordPost = async(req, res) => {
    var email = req.session.email;
    var password = req.body.password;

    var set = await bcrypt.genSalt(10);
    var resetPassword = await bcrypt.hash(password, set);
    var updateQuery = `update user_login set password = '${resetPassword}' where email = '${email}'`;
    var [updateResult] = await con.execute(updateQuery);
    res.redirect("/login");
};

// activetion link method (update status)
const activePost = async(req, res) => {
    var email = req.body.email;
    console.log("JFIDHFIHDFOHDOHJ");
    var resultRandom = req.params.resultRandom;

    var updateQuery = `update student set student_status = 1 where email ="${email}"`;
    console.log(updateQuery);
    var updateQuery1 = `update user_login set user_login_status = 1 where email ="${email}"`;

    var [resultUpdate] = await con.execute(updateQuery);
    var [resultUpdate1] = await con.execute(updateQuery1);

    let d = Array(resultUpdate1);

    let a = d[0].changedRows;
    console.log("a", a);
    if (a == 1) {
        res.json({ UpdateStatus: 1 });
    }
};

// email validation in ragistger page
const validPost = async(req, res) => {
    var email = req.body.email1;
    var nameSelect1 = `select email from student where email = '${email}'`;

    var [data1] = await con.execute(nameSelect1);

    if (data1.length != 0) {
        res.json({ msg1: "kevin", status: 404 });
    } else {
        res.json({ msg1: "right" });
    }
};

const changePasswordPost = async(req, res) => {
    var email11 = req.body.email1;

    var selectEmail = `select email from user_login where email = '${email11}'`;
    var [emailResult] = await con.execute(selectEmail);

    if (emailResult.length == 0) {
        res.json({ msg1: "kevin", status: 404 });
    } else {
        res.json({ msg1: "right" });
    }
};
//  Login page pasword validation
const validPassword = async(req, res) => {
    var email = req.body.useremail;
    var password = req.body.userPassword;

    var nameSelect1 = `select email , password from user_login where email = '${email}'`;
    console.log(nameSelect1);

    var [data1] = await con.execute(nameSelect1);

    if (data1.length != 0) {
        var comparePassword = data1[0].password;
        console.log("comparePassword : ", comparePassword);
        var compare = await bcrypt.compare(password, comparePassword);

        if (!compare) {
            res.json({ msg1: "wrongPassword", status: 400 });
        } else {
            res.json({ msg1: "rightPassword", status: 200 });
        }
    } else {
        res.json({ msg1: "right", status: 404 });
    }
};

// const util = require('util')

 
// var con.execute= util.promisify(con.con.execute).bind(con);

const exam= (async (req,res)=>{
    try{
    //     let user=await con.execute(`select user_id,exam_id,exam_name,total_question,exatime,exam_status from exam`)
    //     console.log(user)
    //     const result1=await con.execute('SELECT * FROM question');
    //     const option1=await con.execute(`select option_value,option_name,questionid from options `)
    //     let result=result1[0]
    //    let  option=option1[0]
    
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
 
})





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
      `SELECT question_text,question_id,option_a,option_b,option_c,option_d,a.category_id FROM exam_system.questions as a left join exam_system.category as b on a.category_id=b.category_id where a.category_id=${category_id} AND a.question_id=${req.query.question_no}`
    );
  
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
    

  };
const examlist = async (req, res) => {
    try{
        let [sql]=await con.execute(`select exam_id,exam_name,access_code,total_ques,time,user_id,exam_status from sys.exam`)
        console.log(sql)

        res.render("examlist",{sql})

    }
    catch(exception ){
        console.log(exception)
    }
}






module.exports={
    exam,
    answerPost,
    prevGet,
    nextGet,
    pagingGet,
    categoryGet,
    registerpage,
    registerpost,
    logingetpage,
    loginpostpage,
    city,
    forgetGet,
    setPasswordGet,
    setPasswordPost,
    sendOtp,
    updatePasswordGet,
    updatePasswordPost,
    activePost,
    validPost,
    changePasswordPost,
    validPassword,
    examlist
}
