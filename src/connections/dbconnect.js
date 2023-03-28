const mysql2 = require("mysql2/promise");
require('dotenv').config({ path: '../.env' });
const con = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
});
module.exports = con;
