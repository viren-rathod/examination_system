const mysql2 = require("mysql2/promise");
const con = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "exam_option",
});

module.exports = con;