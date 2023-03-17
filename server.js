const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// console.log(__dirname + '/public');
const mysql2 = require('mysql2/promise');
const con = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vrn'
});
app.get('/exam', async (req, res) => {
    try {
        let [data] = await con.execute(`SELECT * FROM exam_system.questions`);
        // console.log(data);
        if (data.length) {
            res.render("exam_question", { data: data });
        }
        else res.send("Data not found");
    }
    catch (err) {
        console.log(err);
    }
});
app.post('/answers', async (req, res) => {
    let b = req.body;
    console.log(b);
});

app.get('/test', () => { });
const port = 4321;
app.listen(port, () => {
    console.log("App started on port", port);
});
