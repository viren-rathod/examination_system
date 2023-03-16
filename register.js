const express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const sessions = require('express-session');
var cookie = require('cookie-parser');
var utils = require('util');
const { decode } = require('punycode');
let bodyParser = require('body-parser')
const mysql = require('mysql2');


const app = express();
app.use(express.static('public'));
const ejs = require('ejs');
const { signedCookie } = require('cookie-parser');
app.use(express.static(__dirname + '/registercss'));
const PORT = process.env.PORT || 5050;
app.set('view engine', 'ejs');


app.use(cookie());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "bhimanikevin",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
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

app.get('/', async(req, res) => {


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

        var insertQuery = `INSERT INTO student (name, contact , email, password, address ,gender ,state_id , city , college_id) VALUES ('${fname}', '${phoneN}','${email}','${passwordStrong}','${address}', '${gender}'  ,'${sid[0].state_id}', '${city}' , '${cid[0].college_id}')`;
        var insertResult = await exe(insertQuery);

        var insrertRole = `Insert into user_login (email , password , role , user_login_status) values ('${email}' , '${passwordStrong}' , '0' , '0')`;
        var roleResult = await exe(insrertRole);


        var session = req.session;
        console.log(session)
        if (session.userid) {
            res.send("Welcome User <a href=\'/logout'>click to logout</a>");
        } else
            res.render("hello")

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


    // console.log(signedCookie);
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
    console.log(`http://localhost:${PORT}`);
})