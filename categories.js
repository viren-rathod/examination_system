const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyparser = require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const conn = mysql.createConnection({

        host:'localhost',
        user:'root',
        password:'root',
        database:'exam_system'
});

app.set('view engine','ejs');

app.get('/',(req,res)=>{

    let exam_cat=[];
    let q_cat =`SELECT exam_system.category.category_name , exam_system.exam_category.exam_id
    FROM exam_system.category 
    inner join exam_system.exam_category 
    on exam_system.category.category_id=exam_system.exam_category.category_id;`;
    conn.query(q_cat, (err, result) => {
        if (err) throw err;

        exam_cat = result;
        
    });
   
    let cat_1_que=[];
    let cat1_que =`select * from questions where category_id='1' `;
    conn.query(cat1_que, (err, result) => {
        if (err) throw err;
        cat_1_que=result;
        console.log(cat_1_que);
    });

    let cat_2_que=[];
    let cat2_que=`select * from questions where category_id='2' `;
    conn.query(cat2_que, (err, result) => {
        if (err) throw err;
        cat_2_que=result;
        console.log(cat_2_que);
    });

    let cat_3_que=[];
    let cat3_que =`select * from questions where category_id='3' `;
    conn.query(cat3_que, (err, result) => {
        if (err) throw err;
        cat_3_que=result;
        console.log(cat_3_que);
        res.render('categories',{exam_cat,cat_1_que,cat_2_que,cat_3_que});
    });
})


app.listen(6005,()=>{console.log('running on port 6005...')});
