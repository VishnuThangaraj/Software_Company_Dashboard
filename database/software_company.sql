DROP DATABASE software_company;
CREATE DATABASE software_company;
USE software_company;

CREATE TABLE software_company.client(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    mobile VARCHAR(20),
    location VARCHAR(50),
    website VARCHAR(50),
    organization VARCHAR(50)
);

CREATE TABLE software_company.admin_cred (
	user_id VARCHAR(20),
    password VARCHAR (50)
);

CREATE TABLE software_company.team_lead (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    phone varchar(20),
    age INT,
    gender VARCHAR(50),
    address VARCHAR(100),
    designation VARCHAR(50),
     password VARCHAR(100)
);

CREATE TABLE software_company.projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(50),
    company_id INT,
    budget INT,
    notes VARCHAR(100),
    team_lead_id INT,
    status VARCHAR(10) DEFAULT "ongoing",
    start_date DATE DEFAULT (current_date()),
    due_date DATE,
    FOREIGN KEY (company_id) REFERENCES software_company.client(id),
    FOREIGN KEY (team_lead_id) REFERENCES software_company.team_lead(id)
);

CREATE TABLE software_company.employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(20),
    age INT,
    gender VARCHAR(50),
    address VARCHAR(100),
    designation VARCHAR(50),
    password VARCHAR(100),
    team_lead_id INT,
    FOREIGN KEY (team_lead_id) REFERENCES software_company.team_lead(id)
);

CREATE TABLE software_company.task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    employee_id INT,
    status VARCHAR(50) DEFAULT "Pending",
    project_id INT,
    priority VARCHAR(20),
    percentage INT DEFAULT 0,
    start_date DATE DEFAULT (current_date()),
    comments VARCHAR(100) DEFAULT "",
    due_date DATE,
    FOREIGN KEY (employee_id) REFERENCES software_company.employee(id),
    FOREIGN KEY (project_id) REFERENCES software_company.projects(id)
);

INSERT INTO software_company.admin_cred (user_id, password)
VALUES
	("admin","admin123");
    

INSERT INTO software_company.client (name, email, mobile, location, website, organization)
VALUES
    ('ABC Corporation', 'abc@example.com', '1234567890', 'New York', 'http://www.abc.com', 'PRIVATE'),
    ('XYZ Industries', 'info@xyz.com', '4567890123', 'Los Angeles', 'http://www.xyzindustries.com', 'PRIVATE'),
    ('Tech Solutions Ltd.', 'info@techsolutions.com', '7890123456', 'San Francisco', 'http://www.techsolutions.com', 'PRIVATE'),
    ('Global Innovations Inc.', 'contact@globalinno.com', '2345678901', 'London', 'http://www.globalinnovations.com', 'PUBLIC'),
    ('Innovate Now Ltd.', 'support@innovatenow.com', '5678901234', 'Berlin', 'http://www.innovatenow.com', 'PUBLIC');

INSERT INTO software_company.team_lead (name, email, phone, age, gender, address, designation, password) 
VALUES 
    ('John Doe', 'john.doe@example.com', 1234567890, 35, 'Male', '123 Main St, Anytown', 'Angular Developer', 'John Doe+123'),
    ('Jane Smith', 'jane.smith@example.com', 9876543210, 32, 'Female', '456 Oak Ave, Anycity', 'Dotnet Developer','Jane Smith+123'),
    ('Michael Johnson', 'michael.john@example.com', 5551112222, 40, 'Male', '789 Elm St, Anystate', 'Java Developer', 'Michael Johnson+123'),
    ('Emily Brown', 'emily.brown@example.com', 3334445555, 28, 'Female', '321 Pine Rd, Anycity', 'Python Developer', 'Emily Brown+123'),
    ('David Wilson', 'david.wilson@example.com', 6667778888, 45, 'Male', '555 Cedar Ln, Anytown', 'React Developer', 'David Wilson+123');


INSERT INTO software_company.projects (project_name, company_id, budget, notes, due_date, team_lead_id, status)
VALUES 
    ('Project Alpha', 1, 5000, 'Initial project for client X', '2024-09-30',1, 'ongoing'),
    ('Project Beta', 2, 8000, 'Expansion project for client Y', '2024-09-30',2, 'ongoing'),
    ('Project Cherry', 3, 12000, 'Enhancement project for client Z', '2024-12-31',3, 'completed'),
    ('Project Diary', 4, 10000, 'Critical project for client X', '2024-10-31',4, 'ongoing'),
    ('Project Eclipse', 2, 15000, 'Major project for client Y', '2025-03-31',5, 'completed');


INSERT INTO software_company.employee (name, email, phone, age, gender, address, designation, team_lead_id, password) 
VALUES 
    ('Alice Johnson', 'alice.johnson@example.com', '1112223333', 30, 'Female', '789 Oak St, Anycity, USA', 'React Developer', 1, 'Alice Johnson+123'),
    ('Bob Smith', 'bob.smith@example.com', '4445556666', 25, 'Male', '456 Maple Ave, Anytown, USA', 'Java Developer', 2, 'Bob Smith+123'),
    ('Cathy Brown', 'cathy.brown@example.com', '7778889999', 28, 'Female', '321 Elm Rd, Anystate, USA', 'Angular Developer', 1, 'Cathy Brown+123'),
    ('Daniel Wilson', 'daniel.wilson@example.com', '5556667777', 35, 'Male', '555 Pine Ln, Anycity, USA', 'Dotnet Developer', 3, 'Daniel Wilson+123'),
    ('Eve Taylor', 'eve.taylor@example.com', '8889990000', 27, 'Female', '987 Cedar St, Anystate, USA', 'Dotnet Developer', 2, 'Eve Taylor+123');

INSERT INTO software_company.task (name, description, employee_id, status, priority, due_date, project_id)
VALUES
    ('Design homepage layout', 'Create a new design for the company homepage', 1, 'Progress', 'HIGH',  '2024-07-20',1),
    ('Implement login functionality', 'Develop login feature with OAuth integration', 2, 'Completed', 'MEDIUM', '2024-07-25',1),
    ('Write API documentation', 'Document RESTful API endpoints for version 2.0', 3, 'Completed', 'LOW', '2024-07-15',2),
    ('Bug fixing in user dashboard', 'Fix reported bugs in the user dashboard module', 4, 'Progress', 'HIGH', '2024-07-18',3),
    ('Database schema optimization', 'Optimize database queries and indexes for performance', 4, 'Progress', 'MEDIUM', '2024-07-30',4);


SELECT * FROM software_company.client;
SELECT * FROM software_company.admin_cred;
SELECT * FROM software_company.projects;
SELECT * FROM software_company.team_lead;
SELECT * FROM software_company.employee;
SELECT * FROM software_company.task;

SELECT t.id AS task_id,
       t.name AS task_name,
       t.description AS task_description,
       t.status AS task_status,
       t.priority AS task_priority,
       t.start_date AS task_start_date,
       t.due_date AS task_due_date
FROM software_company.task AS t
JOIN software_company.employee AS e ON t.employee_id = e.id
JOIN software_company.team_lead AS tl ON e.team_lead_id = tl.id
WHERE tl.id = 3;

SELECT e.id AS employee_id,
       e.name AS employee_name,
       COUNT(t.id) AS task_count
FROM software_company.employee AS e
LEFT JOIN software_company.task AS t ON e.id = t.employee_id
WHERE e.team_lead_id = 3
GROUP BY e.id, e.name
ORDER BY e.name;

SELECT p.id, p.project_name, p.company_id, p.budget, p.notes, p.team_lead_id, p.status, p.start_date, p.due_date
FROM software_company.projects p
JOIN software_company.team_lead tl ON p.team_lead_id = tl.id
JOIN software_company.employee e ON tl.id = e.team_lead_id
WHERE e.id = 1;

