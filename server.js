const express = require('express');
const app = express();
const util = require('util')
const bod = require('body-parser');
const path = require('path')
const mysql = require('mysql2');
const profile=require("./models/profile");
const active_link=require("./models/activation");



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



app.get("/register",async(req,res)=>{

    var act = Math.random().toString(36).substring(2, 7);
    var link = `/activation_page?token=${act}`
    console.log(link)

    res.render("activation_page.ejs",{ link })
   
})

app.get("/activation_page",async(req,res)=>{
    const key = req.query.token;


        await query(`update authentication.student set student_status=1 where student_id=1`);
        res.send("activated")
    
 

    
})


app.get("/profile",async(req,res)=>{
    try{
 let sql1=`select id,first_name,email,gender,phone_number ,dob,city,state from basic_details where id=${req.query.id}`;
 let data=await query(sql1);
 console.log(data)


res.render("profile",{data})
    }
    catch(exception){
        console.log(exception)
    }
})


app.post("/edit",(req,res)=>{


})

app.get("/profile_update",async(req,res)=>{

    try{const {id,city,state,gender,dob}=req.query
    // console.log(city,state)
    let sql=`update basic_details set city='${city}',state='${state}',gender='${gender}',dob='${dob}' where id=${id} `
    
    await query(sql)
    res.json("ok")

    }
    catch(exception ){
        console.log(exception)
    }

})



app.listen(8000)