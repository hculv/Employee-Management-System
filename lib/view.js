var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: "root",
    password: "wook1997",
    database: "management_db"
  });


exports.getAllRoles = (cb) => {
 connection.query("SELECT * FROM company_role", function(err,results) {
      if(err) throw err;
      cb(results);
   });
}

exports.getAllDepartments = (cb) => {
    connection.query("SELECT * FROM department", function(err,results) {
      if(err) throw err;
      cb(results);
   });
}

exports.getAllEmployees = (cb) => {
   connection.query("SELECT * FROM employees", function(err,results) {
     if(err) throw err;
     cb(results);
  });
}