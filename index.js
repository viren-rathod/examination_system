const express = require('express');
const app = express();
const util = require('util')
const bod = require('body-parser');
const path = require('path')
const mysql = require('mysql2/promise');
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




var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sys",
    port: 3306
});

 
// var query= util.promisify(conn.query).bind(conn);
// app.use(profile)
// app.use(active_link)

app.get("/",(req,res)=>{
    res.render("dashboard")
})


app.get("/form1",(req,res)=>{
    res.render("form")
})

app.get("/examlist",async(req,res)=>{
    try{
        let [sql]=await con.execute(`select exam_id,exam_name,access_code,total_ques,time,user_id,exam_status from sys.exam`)
        console.log(sql)

        res.render("examlist",{sql})

    }
    catch(exception ){
        console.log(exception)
    }
    
})

app.get("/exam",(async (req,res)=>{
    try{
        let [user]=await con.execute(`select user_id,exam_id,exam_name,total_ques,time,exam_status from exam`)
        console.log(user)
        const [result]=await con.execute('SELECT * FROM question');
        const [option]=await con.execute(`select option_value,option_name,questionid from options `)
        console.log(option);
        console.log(result);
        res.render('exam',{result,option,user});

        
    }
    catch(exception){
        console.log(exception);
    }
 
})
)


app.listen(8000)