const mysql2 = require("mysql2/promise");
const con = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "exam_system",
});

module.exports = con;