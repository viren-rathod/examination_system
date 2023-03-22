const con = require("../connections/dbconnect");
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

};