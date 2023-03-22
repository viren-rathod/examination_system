const mysql = require('mysql2/promise');



var conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "exam_system",
    port: 3306
});

module.exports =conn