const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ejs } = require('ejs');
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/public/img')))
app.use(express.static(path.join(__dirname, '/public/css')))
app.set("views","./views");
app.set('view engine','ejs');

const connection = require('./config/db-config.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 8050;

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
app.get('/profile', (req, res) => {
 
    res.render('profile')
});

//instruction page
app.get('/instruction',(req, res) => {
    res.render('instruction')

})
app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    console.log(`http://localhost:${PORT}`);
})