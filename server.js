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
app.get('/', async (req, res) => {
    const result = await queryExecuter(`select id,first_name,last_name,address1,email,phone_num,state,city,gender from  job_new.basic_details where id=1`);
    // console.log(result);
    res.render('homestart', { editdata: result })
})


//result page
app.get('/result', (req, res) => {
    res.render('result');
})




//profile-update page
app.post("/profile_update", async (req, res) => {

    try {
        const { id, firstname, lastname, email } = req.body
        console.log(id, firstname, lastname, email)
        let sql = `update basic_details set first_name='${firstname}',last_name='${lastname}',email='${email}' where id=${id} `
        await queryExecuter(sql);
        res.json("ok")

    }
    catch (exception) {
        console.log(exception)
    }

})

//exam_home
app.get('/exam_home', async (req, res) => {

    const result = await queryExecuter(`select * from exam_system.questions;`)
    console.log(result);
    res.render('exam_start', { exam_que: result })
})



app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    console.log(`http://localhost:${PORT}`);
})




// Good Evening sir,
//     My task for today: -
//         Desgining of: -
//             1. create dashboard ui
// 2. works on JavaScript


// Done!

// Tomorrow task: -
//     -> To Perform JavaScript operations and render data