const mysql2 = require('mysql2/promise');
const dbconnection = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "exam_system"
})
module.exports = dbconnection;