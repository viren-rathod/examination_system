const mysql2 = require('mysql2');
const dbconnection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_new"
})
module.exports = dbconnection;