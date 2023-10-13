const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1437890",
  database: "jntugv",
  port: "3306",
});
// const con=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"1437890",
//     database:"jntugv",
//     port:"3306"
// })

const admin_table = () => {
  const admin_tab =
    "CREATE TABLE IF NOT EXISTS admins(id int AUTO_INCREMENT PRIMARY KEY,name varchar(255) NOT NULL,username varchar(255) NOT NULL UNIQUE KEY,password varchar(255) NOT NULL,role varchar(255) NOT NULL);";
  try {
    con.query(admin_tab);
  } catch (err) {
    console.log(err + "Table not Created");
  }
};

app.get("/config", (req, res) => {
  admin_table();
  res.end();
});

app.listen(8080, (req, res) => {
  // res.send("Port 8080")
  console.log("Config.js file Server running on port no:8888");
});

module.exports = con;
