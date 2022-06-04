var inq = require("inquirer");
var mysql = require("mysql");

var app = require("../index");
var view = require("./view");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: "root",
    password: "wook1997",
    database: "management_db"
  });

exports.addEmployee = () => {
   view.getAllRoles(function(rolesResults) {
      var roles = [];
      for(var i = 0; i < rolesResults.length; i++) {
          roles.push(rolesResults[i].title);
      }
       var options = [
        {
            type: "input",
            message: "Employee First Name",
            name: "firstName",
            default: "Cristian"
        },
        {
            type: "input",
            message: "Employee Last Name",
            name: "lastName",
            default: "Jonson"
        },
        {
            type: "list",
            message: "Employee Role",
            name: "role",
            choices: roles
        }
        ];

        inq.prompt(options)
        .then((answers) => {
            var roleId = null;
            for(var i= 0; i < rolesResults.length; i++) {
                if(rolesResults[i].title === answers.role) {
                    roleId = rolesResults[i].role_id
                }
            }
            connection.query("INSERT INTO employees SET ?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    emp_role_id: roleId
                },
            function(err,results) {
                if(err) throw err;
                console.log("Successfully added " + answers.firstName + " " + answers.lastName );
                app.start();
            });
        });
    });
};