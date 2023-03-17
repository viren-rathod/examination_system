const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ejs } = require('ejs');
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/public/img')))
app.use(express.static(path.join(__dirname, '/public/css')))
app.set("views", "./views");
app.set('view engine', 'ejs');

const connection = require('./config/db-config.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 8050;

async function queryExecuter(query) {
    return new Promise((resolve, rejects) => {
        connection.query(query, (err, result) => {
            if (err) {
                rejects(err);
            }
            resolve(result);
        });
    })
}

//database connection
connection.connect((err) => {
    if (err)
        console.log(err.message);
})


// home page
app.get('/', (req, res) => {
    res.render('homestart')
})

//profile page
// app.get('/profile', (req, res) => {

//     res.render('profile')
// });

//result page
app.get('/result', (req, res) => {
    res.render('result');
})


//profile page
app.get("/profile", async (req, res) => {
    try {
        let sql1 = `select id,first_name,last_name,email,gender,phone_num ,date,city,state from basic_details where id=${req.query.id}`;
        let data = await queryExecuter(sql1);
        console.log(data)
        res.render("Profile", { data})
    }
    catch (exception) {
        console.log(exception)
    }
})

//profile-update page
app.get("/profile_update", async (req, res) => {

    try {
        const { id, city, state, gender, dob } = req.query
        console.log(gender)
        let sql = `update basic_details set city='${city}',state='${state}',gender='${gender}',date='${dob}' where id=${id} `

        await queryExecuter(sql)
        res.json("ok")

    }
    catch (exception) {
        console.log(exception)
    }

})

app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    console.log(`http://localhost:${PORT}`);
})




// Good Evening sir,
// My task for today:-
// Desgining of:- 
// 1. Create Homepage 
// 2. instruction page


// Done!

// Tomorrow task:-
// -> add to Javascript pages