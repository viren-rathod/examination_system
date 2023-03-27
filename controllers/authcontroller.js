const con = require("../connections/dbconnect");
var utils = require("util");
const { decode } = require("punycode");
const flash = require("connect-flash");
var nodemailer = require("nodemailer");
const { signedCookie } = require("cookie-parser");
const { Console } = require("console");
const bcrypt = require("bcryptjs");

async function queryExecuter(query) {
    return new Promise((resolve, rejects) => {
        con.query(query, (err, result) => {
            if (err) {
                rejects(err);
            }
            resolve(result);
        });
    });
}

//dhruv
const logoutpageGet = async(req, res) => {
    req.session.destroy();
    res.redirect("/login");
};

const homepageGet = async(req, res) => {
    // req.session.email = email;

    if (!req.session.email) {
        res.render("login", { msg: "" });
    } else {
        // console.log("Sesion :- ", req.session.email);
        // console.log(`select student_id,name,address,email,contact,city,gender from  student where email='${req.session.email}'`);
        const [result] = await con.execute(
            `select student_id,name,address,email,contact,city,gender from  student where email='${req.session.email}'`
        );
        res.render("homestart", { editdata: result });
    }
};

const exam_homepageGet = async(req, res) => {
    const [result] = await con.execute(`select * from questions;`);

    res.render("exam_start", { exam_que: result });
};

const resultpageGet = async(req, res) => {
    res.render("result");
};
const profile_updatepagePOST = async(req, res) => {
    try {
        const { firstname, email } = req.body;
        // console.log(id, firstname, email);
        req.session.email = email;
        // console.log('email update to email', req.session.email);
        let sql = `update student set name='${firstname}',email='${email}' where student_id=${req.session.stdId} `;
        await con.execute(sql);
        let updateUser = `update user_login set email='${email}' where user_id=${req.session.userId} `;
        await con.execute(updateUser);

        // let sql = `update exam_system.student set name='${firstname}',email='${email}',address='${address}',contact='${contact}',gender='${gender}' where email='${req.session.email}' `
        // console.log(sql);
        // await con.execute(sql);
        // req.session.email = email;
        // let updateUser = `update user_login set email='${email}' where user_id=${req.session.userId} `
        // await con.execute(updateUser);

        res.json("ok");
    } catch (exception) {
        // console.log(exception)
    }
};

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

    var [cid] = await con.execute(
        `select * from colleges where college_name='${college}'`
    );
    // console.log(cid);

    var stateId = `select state_id from state where state_name ='${state}'`;
    var [sid] = await con.execute(stateId);

    // req.session.email = email;
    // req.session.stdId = insertResult.insertId;
    // req.session.userId = roleResult.insertId;
    // console.log("register session s u e", req.session.stdId, req.session.userId, req.session.email)

    if (selectResult.length != 0) {
        return res.send("This Email is already Exectute");
    } else {
        var insertQuery = `INSERT INTO student (name, contact , email, password, address ,gender ,state_id , city , college_id , student_status,created_date ) VALUES ('${fname}', '${phoneN}','${email}','${passwordStrong}','${address}', '${gender}'  ,'${sid[0].state_id}', '${city}' , '${cid[0].college_id}' , '0',NOW() )`;
        var [insertResult] = await con.execute(insertQuery);

        var insrertRole = `Insert into user_login (email , password , role , user_login_status,created_date) values ('${email}' , '${passwordStrong}' , '0' , '0',NOW())`;
        var [roleResult] = await con.execute(insrertRole);

        // req.session.email = email;
        // req.session.stdId = insertResult.insertId;
        // req.session.userId = roleResult.insertId;
        // console.log("register session s u e", req.session.stdId, req.session.userId, req.session.email)

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

    var selectEmail = `SELECT * FROM student where email = '${email}' `;
    var [emailResult] = await con.execute(selectEmail);

    var selectUser = `SELECT * from user_login where email = '${email}'`;
    var [userData] = await con.execute(selectUser);

    if (userData.length == 0) {
        // res.send("email is not match");
        res.render("login", { msg: "email or pasword does not match" });
    } else {
        var comparePassword = userData[0].password;

        var compare = await bcrypt.compare(password, comparePassword);
        var resultRandom = Math.random().toString(36).substring(2, 7);
        // console.log("Viren@123 :- ", compare);
        if (!compare) {
            // res.send("Password is not match");
            res.render("login", { msg: "email or pasword does not match" });
        } else {
            var comparePassword = userData[0].password;

            var compare = await bcrypt.compare(password, comparePassword);
            var resultRandom = Math.random().toString(36).substring(2, 7);
            // console.log("Viren@123 :- ", compare);
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
                    req.session.stdId = emailResult[0].student_id;
                    req.session.userId = userData[0].user_id;
                    console.log(
                        "l l l l l  session s u e",
                        req.session.stdId,
                        req.session.userId,
                        req.session.email
                    );

                    res.redirect("/home");
                }
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

//? generate otp function random function
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

//?-----------sendopt function---------------------

const sendOtp = async(req, res, next) => {
    var email = req.body.email;
    console.log("Send email in post method", email);
    var otp = generateOTP();
    console.log("otp", otp);
    // let testAccount = nodemailer.createTestAccount();
    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     auth: {
    //         type: "OAUTH2",
    //         user: "patelnokano000@gmail.com",
    //         clientId: "67052588834-mk4nh286olopiqjo696603gb0pfkpicm.apps.googleusercontent.com",
    //         clientSecret: "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",
    //         refreshToken: "1//04us9E3b_ARjICgYIARAAGAQSNwF-L9IrPSpdH05Mzzl8BuxFOyRDE0lsDzRRfMdEg2jQA_uFDp7G4que8m713t_5q1CjRlSK8qY",
    //         accessToken: "ya29.a0AVvZVspJqb2vWNPWa55TrdhaULzKmGSJOEsiZF-ctCG4GxpqNzI7cHKiG1CAJr1CkWbpm-EytloslaQfHQLpoZJJyR0wFJYzqwD4F65wZwaYVHvNx3SIznPvddsuorAivrditj4xvnxLip4KYy_-14DYlANRaCgYKARYSARISFQGbdwaIV0_DBqtSOLdypveodSvlrA0163",
    //     },
    // });

    // let info = transporter.sendMail({
    //     from: "hello <patelnokano000@gmail.com>", // sender address
    //     to: email, // list of receivers
    //     subject: "OTP Validation ✔", // Subject line
    //     text: "OTP", // plain text body
    //     html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    //     <div style="margin:50px auto;width:70%;padding:20px 0">
    //       <div style="border-bottom:1px solid #eee">
    //         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
    //       </div>
    //       <p style="font-size:1.1em">Hi,</p>
    //       <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    //       <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    //       <p style="font-size:0.9em;">Regards,<br />EsparkBiz</p>
    //       <hr style="border:none;border-top:1px solid #eee" />
    //     </div>
    //   </div>`,
    // });
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
    // console.log("JFIDHFIHDFOHDOHJ");
    var resultRandom = req.params.resultRandom;

    var updateQuery = `update student set student_status = 1 where email ="${email}"`;
    // console.log(updateQuery);
    var updateQuery1 = `update user_login set user_login_status = 1 where email ="${email}"`;

    var [resultUpdate] = await con.execute(updateQuery);
    var [resultUpdate1] = await con.execute(updateQuery1);

    let d = Array(resultUpdate1);

    let a = d[0].changedRows;
    // console.log("a", a);
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
    // console.log(nameSelect1);

    var [data1] = await con.execute(nameSelect1);

    if (data1.length != 0) {
        var comparePassword = data1[0].password;
        // console.log("comparePassword : ", comparePassword);
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

// update profile update password
var updateProfilePassword = async(req, res) => {
    var old_pass = req.body.old_pass;
    var save_pass = req.body.save_pass;
    var confirm_pass = req.body.save_confirm;
    console.log("adity", old_pass, save_pass, confirm_pass);

    var selectAllUserData = `select user_id , password from user_login where email = '${req.session.email}'`;
    var [userData] = await con.execute(selectAllUserData);
    console.log(userData);
    var selectAllStudentData = `select student_id from student where email = '${req.session.email}'`;
    var [studentData] = await con.execute(selectAllStudentData);
    console.log(studentData);

    var compare = await bcrypt.compare(old_pass, userData[0].password);
    console.log(compare);

    if (!compare) {
        res.json({ text: "wrong" });
    } else {
        if (save_pass == "") {
            res.json({ text: "blank" });
        } else if (confirm_pass == "") {
            res.json({ text: "empty" });
        } else if (save_pass != confirm_pass) {
            res.json({ text: "notMatch" });
        } else {
            console.log("eneter the else loop");
            var snum = await bcrypt.genSalt(10);
            var passwordStrong = await bcrypt.hash(save_pass, snum);

            var updateQuery = `update user_login set password = '${passwordStrong}' where user_id = '${userData[0].user_id}'`;
            var updateQuery1 = `update student set  password = '${passwordStrong}' where student_id = '${studentData[0].student_id}'`;

            var [resultUpdate] = await con.execute(updateQuery);
            var [resultUpdate1] = await con.execute(updateQuery1);
            // res.render('login', { msg: "" })
            res.json({ text: "success" });
        }
    }
};

const form1 = async(req, res) => {
    try {
        if (!req.session.email) {
            res.render("login", { msg: "" });
        } else {
            let flag;
            // console.log("Sesion :- ", req.session.email);
            // console.log(`select student_id,name,address,email,contact,city,gender from  student where email='${req.session.email}'`);

            let user_email = req.session.email;
            const [result12] = await con.execute(
                `select student_id,name,address,email,contact,city,gender from  student where email='${req.session.email}'`
            );

            let [sql1] = await con.execute(
                `select exam_id,exam_name,exam_access_code,total_questions,exam_time,user_id,exam_status from exam where exam_status=0`
            );
            // console.log("hello nareshjbffh",sql1[0].exam_id)

            let [sql2] = await con.execute(
                `select exam.exam_id,exam_name,user_answers.user_id from exam,user_answers where  user_answers.exam_id=exam.exam_id and exam_status=0 and user_answers.user_id=${req.session.userId}`
            );
            // console.log(sql2[0].user_id);
            // console.log(req.session);
            let flag1 = 0;
            let attempted;

            let data1 = sql1;
            //  console.log('-------------------------------------')
            //  console.log(data1)
            //  console.log(typeof(data1));
            // //  data1[0].attempted = true;
            //  console.log(data1);
            //  console.log('-------------------------------------')

            for (let i = 0; i < sql1.length; i++) {
                flag1 = 0;
                for (let j = 0; j < sql2.length; j++) {
                    if (sql1[i].exam_id == sql2[j].exam_id) {
                        // attempted = true;'
                        data1[i].attempted = true;

                        flag1 = 1;
                    }
                }
                if (flag1 == 0) {
                    // attempted = false;
                    data1[i].attempted = false;
                }
            }

            // console.log("-------------------------------------");
            // console.log(data1);
            // console.log("-------------------------------------");

            let userEmail = req.session.email;
            console.log("Session E - mail -: ", req.session.email);

            let sql = `select name,email,contact,gender,city,college_name from student INNER JOIN colleges on  colleges.college_id=student.college_id where email='${user_email}'`;
            let [data] = await con.execute(sql);
            // console.log(data[0]);
            let result = data[0];
            // console.log("ye falg hai", flag);
            //  console.log(data1)
            res.render("examlist", { sql: data1, result, editdata: result12 });
            // res.render("form",{result})
        }
    } catch (exception) {
        console.log("Error: ", exception);
    }
};

const validate_code = async(req, res) => {
    let email = req.query.email;
    let examId = req.query.exam_id;
    console.log("ye code hai tera ", examId, "Thank you!");
    // console.log("Email: ", email);
    let sql11 = `select exam_access_code from exam where exam_id=${examId};`;
    // console.log(sql11);
    let verify = await con.execute(sql11);
    console.log("cod hai");
    console.log(verify);
    res.json(verify);
};

// !--------------------VIREN--------------------------------------
const examGet = async(req, res) => {
    try {
        const question_no = 1,
            category_id = req.query.category_id || 1; // Get the requested page number, default to 1 if not provided
        const question_per_page = 1; //* Limit || Number of questions to display per page
        const offset = (question_no - 1) * question_per_page;
        let exam_id = 1;
        let [exam] = await con.execute(
            `SELECT exam_name,total_questions,exam_time,exam_access_code FROM exam WHERE exam_id = '${exam_id}'`
        );
        let [category] = await con.execute(
            `select category_name,b.category_id from exam a, exam_category b,category c where a.exam_id=b.exam_id and b.category_id=c.category_id and a.exam_id=${exam_id}`
        );
        // console.log('Exam :- ',category[0]);

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
const examPost = async(req, res) => {
    res.redirect("examGet");
};
const categoryGet = async(req, res) => {
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
const pagingGet = async(req, res) => {
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
const nextGet = async(req, res) => {
    let id = parseInt(req.query.id) + 1;
    let [question] = await con.execute(
        `SELECT * FROM questions WHERE question_id = ${id}`
    );
    // console.log(question);
    res.json(question);
};
const prevGet = async(req, res) => {
    let id = parseInt(req.query.id) - 1;
    let [question] = await con.execute(
        `SELECT * FROM questions WHERE question_id = ${id}`
    );
    res.json(question);
};
const answerPost = async(req, res) => {
    let b = req.body;
    console.log("ID :- ", b);
    if (b.id) {
        let [check] = await con.execute(
            `SELECT user_answers FROM user_answers WHERE question_id=${b.id}`
        );
        if (check.length == 0) {
            let query = `INSERT INTO user_answers (user_id,exam_id, question_id,user_answers,marks) VALUES (1,1,${b.id},'${b.selectedAns}',1)`;
            let [data] = await con.execute(query);
        } else {
            let query = `UPDATE user_answers SET user_answers='${b.selectedAns}' WHERE question_id=${b.id}`;
            let [data] = await con.execute(query);
            res.json(data);
        }
    } else {
        res.json("");
    }
};
const getAns = async(req, res) => {
    let id = req.body;
    let [q] = await con.execute(
        `SELECT user_answers FROM user_answers WHERE question_id = ${id[0].question_id}`
    );
    // console.log("Ans :- ",q);
    res.json(q);
};
const getAllAns = async(req, res) => {
    let [q] = await con.execute(`SELECT user_answers FROM user_answers`);
    // console.log("Ans :- ",q);
    res.json(q);
};

const endExam = async(req, res) => {
    res.render("end");
};

const getCategoryName = async(req, res) => {
    // console.log("hhgghfghkjhk",req.query.btn=="next"? parseInt(req.query.id) + 1 : parseInt(req.query.id) - 1 );
    let [c_name] = await con.execute(
        `select b.category_name from questions a,category b where a.category_id=b.category_id and a.question_id= ${
      req.query.btn == "next"
        ? parseInt(req.query.id) + 1
        : parseInt(req.query.id) - 1
    }`
    );
    // console.log("dhsfhifghij");
    // let qid = req.query.qid;
    // console.log('qid :- ',qid);
    res.json(c_name);
};

module.exports = {
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
    homepageGet,
    exam_homepageGet,
    resultpageGet,
    profile_updatepagePOST,
    logoutpageGet,
    form1,
    validate_code,
    examGet,
    answerPost,
    prevGet,
    nextGet,
    pagingGet,
    categoryGet,
    getAns,
    endExam,
    getCategoryName,
    examPost,
    getAllAns,
    updateProfilePassword,
};