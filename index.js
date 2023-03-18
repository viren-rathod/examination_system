const express = require('express');
const app = express();
const util = require('util')
const bod = require('body-parser');
const path = require('path')
const mysql = require('mysql2');
// const profile=require("./models/profile");
// const active_link=require("./models/activation");



app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public/images')));
app.use(express.static(path.join(__dirname + '/public/css_files')));
app.use(express.static(path.join(__dirname + '/public/scripts')));


// app.use(profile)
app.use(bod.json());
app.use(bod.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set("views", "./views");

app.get("/",(req,res)=>{
    res.render("dashboard")
})



var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_application",
    port: 3306
});

 
var query= util.promisify(conn.query).bind(conn);
// app.use(profile)
// app.use(active_link)



app.get("/form1",(req,res)=>{
    res.render("form")
})

app.get("/examlist",async(req,res)=>{
    try{
        let sql=await query (`select exam_id,exam_name,access_code,total_ques,time,user_id,exam_status from sys.exam`)
        console.log(sql)

        res.render("examlist",{sql})

    }
    catch(exception ){
        console.log(exception)
    }
    
})


app.listen(8000)