const express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const sessions = require('express-session');
var cookie = require('cookie-parser');
var utils = require('util');
const { decode } = require('punycode');
let bodyParser = require('body-parser')
const mysql = require('mysql2');
const flash = require('connect-flash');
var nodemailer = require('nodemailer');

const app = express();
app.use(express.static('public'));
const ejs = require('ejs');
const { signedCookie } = require('cookie-parser');
app.use(express.static(__dirname + '/registercss'));
app.use(express.static(__dirname + '/photo'));
const PORT = process.env.PORT || 8050;
app.set('view engine', 'ejs');

app.use(cookie());
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "bhimanikevin",
    saveUninitialized: true,
    resave: false
}));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'exam_project'
});

var exe = utils.promisify(conn.query).bind(conn);
conn.connect((err) => {
    if (err) throw err;
});

// app.get('/', async(req, res) => {


//     var selectState = `select state_name from state `;
//     var stateResult = await exe(selectState);


//     var selectCity = `select city_name from city where state_id = 1`;
//     var cityResult = await exe(selectCity);

//     var selectCollege = `select * from colleges`;
//     var collegeResult = await exe(selectCollege);


//     res.render('register', {
//         stateResult: stateResult,
//         cityResult: cityResult,
//         collegeResult: collegeResult
//     });


// });



app.get('/register', async(req, res) => {
    // res.render('register')
    var selectState = `select state_name from state `;
    var stateResult = await exe(selectState);


    var selectCity = `select city_name from city where state_id = 1`;
    var cityResult = await exe(selectCity);

    var selectCollege = `select * from colleges`;
    var collegeResult = await exe(selectCollege);


    res.render('register', {
        stateResult: stateResult,
        cityResult: cityResult,
        collegeResult: collegeResult
    });
});

app.post("/register", async(req, res) => {

    var fname = req.body.fname; // fname
    var lname = req.body.lname; //   lname
    var email = req.body.email; // email address
    var password = req.body.password; // password
    var address = req.body.address; //address 
    var gender = req.body.gender; //gender
    var phoneN = req.body.phoneN;
    var state = req.body.state;
    var city = req.body.city;
    var college = req.body.college;

    var snum = await bcrypt.genSalt(10);
    var passwordStrong = await bcrypt.hash(password, snum);

    var selectQuery = `SELECT * FROM student where email = '${email}' `
    var selectResult = await exe(selectQuery);


    var stateId = `select state_id from state where state_name ='${state}'`
    var sid = await exe(stateId);

    var collegeId = `select college_id from colleges where college_name = '${college}'`;
    var cid = await exe(collegeId);



    if (selectResult.length != 0) {
        return res.send('This Email is already Exectute');
    } else {

        var insertQuery = `INSERT INTO student (name, contact , email, password, address ,gender ,state_id , city , college_id ) VALUES ('${fname}', '${phoneN}','${email}','${passwordStrong}','${address}', '${gender}'  ,'${sid[0].state_id}', '${city}' , '${cid[0].college_id}' )`;
        var insertResult = await exe(insertQuery);

        var insrertRole = `Insert into user_login (email , password , role , user_login_status) values ('${email}' , '${passwordStrong}' , '0' , '0')`;
        var roleResult = await exe(insrertRole);


        var resultRandom = Math.random().toString(36).substring(2, 7);
        var link = `/activation?token=${resultRandom}`
            // res.render("activation_page.ejs",{ link })

        req.session.email = email;

        res.render("activation.ejs", {
            resultRandom,
            email: email
        })
    }

})

app.get("/forget", async(req, res) => {

    res.render("validEmail")
})

app.get("/login", (req, res) => {

    res.render('login');

})

app.post('/login', async(req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    var selectEmail = `SELECT email, password FROM student where email = '${email}' `
    var emailResult = await exe(selectEmail);


    if (emailResult.length == 0) {
        res.send("email is not match");
    } else {
        var comparePassword = emailResult[0].password;

        var compare = await bcrypt.compare(password, comparePassword);


        if (!compare) {
            res.send("Password is not match")
        } else {
            req.session.email = email;
            res.render("home.ejs")

        }
    }

})


app.get('/city', async(req, res) => {
    var state = req.query.state;

    var stateId = `select state_id from state where state_name= '${state}'`;
    var sid = await exe(stateId);

    conn.query(`select city_name from city where state_id = '${sid[0]['state_id']}'`, (err, result9) => {
        if (err) throw err;

        res.json({ result9 });
    })

})
app.get('/setPassword', async(req, res) => {
    res.redirect('/login');
})
app.post('/setPassword', async(req, res) => {
    res.render("setPassword")
})


app.post('/fetch_api', (req, res) => {

    var email = req.body.email;
    console.log("Send email in post method", email)
    let testAccount = nodemailer.createTestAccount();
    var otp = generateOTP();
    console.log("otp", otp);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            type: 'OAUTH2',
            user: 'patelnokano000@gmail.com',
            clientId: '67052588834-mk4nh286olopiqjo696603gb0pfkpicm.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04zKr1mHUFLaUCgYIARAAGAQSNwF-L9Ir4G3A-ZbFzD8UDxyL1m3B70W4pmoI_T3UMq0FYYKkSZdcjn48d0JwIbfTz2utFts-Vsc',
            accessToken: 'ya29.a0AVvZVsrTTPvWdLrKPI8g1ApH6OJGF6WEDoKapf16G-555x3h7wywvEA3Gyo_BryLnyYcYRixND4CdKbkym0aEDJsNq3a2XiUcIyBU0-uSfCTt9G-LhxL4oczfo-xBIsjQ03PlGlBiMCNYPXgqMWjjukutehFAbwaCgYKASUSARISFQGbdwaIc2AjLhspFzy5fGdi1TualQ0166',
        }
    });

    let info = transporter.sendMail({
        from: 'hello <patelnokano000@gmail.com>', // sender address
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
      </div>`
    });
    req.session.email = email;
    res.json({
        otp
    });
})




app.post("/active/:resultRandom", async(req, res) => {
    var email = req.body.email;
    var resultRandom = req.params.resultRandom;

    var updateQuery = `update student set student_status = 1 where email ="${email}"`;

    var resultUpdate = await exe(updateQuery)

    let d = (Array(resultUpdate))

    let a = d[0].changedRows;
    if (a == 1) {
        res.json({ UpdateStatus: 1 })
    }
})

app.post("/changePassword", async(req, res) => {

    var email11 = req.body.email1;


    var selectEmail = `select email from student where email = '${email11}'`
    var emailResult = await exe(selectEmail)


    if (emailResult.length == 0) {
        res.json({ msg1: "kevin", status: 404 })
    } else {
        res.json({ msg1: "right" });
    }

})
app.get("/updatePassword", (req, res) => {
    res.redirect("/login");
})

app.post("/updatePassword", async(req, res) => {
    var email = req.session.email;

    var password = req.body.password;


    var set = await bcrypt.genSalt(10);
    var resetPassword = await bcrypt.hash(password, set);


    var updateQuery = `update student set password = '${resetPassword}' where email = '${email}'`;
    console.log("update query", updateQuery)
    var updateResult = await exe(updateQuery)
    res.redirect("/login");
})

app.get('/updatePassword', (req, res) => {
    res.redirect('/login');
})
app.post('/updatePassword', (req, res) => {
    res.render('/setPassword');
})


app.post('/valid1', async(req, res) => {
    var email = req.body.email1;
    var nameSelect1 = `select email from student where email = '${email}'`;

    var data1 = await exe(nameSelect1);

    if (data1.length != 0) {
        res.json({ msg1: "kevin", status: 404 })
    } else {
        res.json({ msg1: "right" });
    }
})

app.listen(PORT, (err) => {
    console.log(`http://localhost:${PORT}/register`);
})





// function for otp 
function generateOTP() {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}