var mysql = require('mysql');
var inq = require("inquirer");
var add = require("./lib/add");
var update = require("./lib/update");
var view = require("./lib/view");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "wook1997",
  database: "management_db"
});

// connection.connect(function(err) {
  // if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");
  // exports.start();
// });


    inq.prompt([
        {
            type: "list",
            message: "Choose one of the following:",
            name: "choice",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Info",
                "EXIT"                
            ]
        }
    ])
    .then(function(answer) {
      if(answer.choice === "View All Employees") {
        getAllEmployees();
      }
      else if(answer.choice === "Add Employee") {
        add.addEmployee();
      }      
      else if(answer.choice === "Update Employee Info") {
        update.updateRole();
      }
      else if(answer.choice === "EXIT") {
        connection.end();
        return
      }
  

updateRole = () => {
  view.getAllEmployees(function (employeeResults) {
      console.log("test here:");
      console.log(employeeResults);
      var employees = [];
      for (var i = 0; i < employeeResults.length; i++) {
          var fullName = {
              name: employeeResults[i].first_name + ' ' + employeeResults[i].last_name,
              value: {
                  id: employeeResults[i].emp_id,
                  firstname: employeeResults[i].first_name,
                  lastname: employeeResults[i].last_name
              }
          };

          employees.push(fullName)
      };

      inq.prompt([
          {
              type: "list",
              message: "Which employee would you like to update?",
              name: "employee",
              choices: employees
          }
      ]).then((answers) => {
          view.getAllRoles(function (rolesResults) {
              var roles = [];
              console.log(answers.employee);

              for (var i = 0; i < rolesResults.length; i++) {
                  var fullRole = {
                      name: rolesResults[i].title,
                      value: {
                          id: rolesResults[i].role_id,
                          role: rolesResults[i].title,
                      }
                  }
                  roles.push(fullRole);
              };

              inq.prompt([
                  {
                      type: "list",
                      message: `Which role would you like to update ${answers.employee.firstname} to?`,
                      name: "role",
                      choices: roles
                  }
              ]).then((results) => {
                  console.log("results...")
                  console.log(results.role)
                  connection.query("UPDATE employees SET emp_role_id = ? WHERE emp_id = ?",[results.role.id, answers.employee.id],function (err, results) {
                      if (err) throw err;
                      console.log("Successfully updated " + answers.employee.id);
                      app.start();
                  })
              });
          });
      });
  });
};

getAllEmployees = (cb) => {
  connection.query("SELECT * FROM employees", function(err,results) {
    if(err) throw err;
    cb(results);
 });
}

addEmployee = () => {
   view.getAllRoles(function(rolesResults) {
      var roles = [];
      for(var i = 0; i < rolesResults.length; i++) {
          roles.push(rolesResults[i].title);
      }
       var options = [
        {
            type: "input",
            message: "Employee's First Name",
            name: "firstName",
            default: "Jane"
        },
        {
            type: "input",
            message: "Employee's Last Name",
            name: "lastName",
            default: "Doe"
        },
        {
            type: "list",
            message: "Employee's Role",
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
};     });
