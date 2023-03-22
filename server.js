
const PORT = process.env.PORT || 4322;
const express = require('express')
//express object
const app = express();
const bodyParser = require('body-parser');
const { ejs } = require('ejs');
const path = require('path');
const route = require('./routes/router');



//middleware
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/public/img')))
app.use(express.static(path.join(__dirname, '/public/css')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//set engines
app.set("views", "./views");
app.set('view engine', 'ejs');


//routes
app.use('/', route);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`http://localhost:${PORT}/home`);
})

