
const express = require("express");
const app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const ejs = require('ejs');
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));
const cors = require("cors");
app.use(cors());

const router = require('./routes/router');

//router routes
app.use('/', router);

const PORT = 8000 ;
app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log(`Server running on port ${PORT}`);
})