const mysql2 = require('mysql2/promise');
const dbconnection = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_new"
})
module.exports = dbconnection;