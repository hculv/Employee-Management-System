INSERT INTO department (dept_name) VALUES ('manager'), ('employee'), ('intern');
INSERT INTO employee_role (title, salary, dept_id) VALUES
('Manager', 90000.00, 3), 
('Developer', 70000.00, 1),
('Designer', 40000.00, 1),
('Copywriter', 40000.00, 1 ),
('Video Editor', 30000.00, 1),                
('Intern', 10000.00, 2);

INSERT INTO employee (first_name, last_name, emp_role_id, manager_id) VALUES
('Mark', 'Justine', 1, 1),
('Savannah', 'Klemm', 6, 1),
('Hannah', 'Culver', 2, 2);