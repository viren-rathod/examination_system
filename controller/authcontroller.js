const conn = require('../connection/dbconnect');
//database connection

async function queryExecuter(query) {
    return new Promise((resolve, rejects) => {
        conn.query(query, (err, result) => {
            if (err) {
                rejects(err);
            }
            resolve(result);
        });
    })
}



const homepageGet = async (req, res) => {
    const [result] = await conn.execute(`select student_id,name,address,email,contact,city,gender from  exam_system.student where student_id=1`);
    console.log(result);
    res.render('homestart', { editdata: result })
}


const exam_homepageGet = async (req, res) => {
    const [result] = await conn.execute(`select * from exam_system.questions;`)

    res.render('exam_start', { exam_que: result })
}

const resultpageGet = async (req, res) => {
    res.render('result');
}
const profile_updatepagePOST = async (req, res) => {
    try {
        const { id, firstname, email } = req.body
        console.log(id, firstname, email);
        let sql = `update exam_system.student set name='${firstname}',email='${email}' where student_id=${id} `
        await conn.execute(sql);
        res.json("ok")

    }
    catch (exception) {
        console.log(exception)
    }
}

module.exports = { homepageGet, exam_homepageGet, resultpageGet, profile_updatepagePOST };