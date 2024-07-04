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
    organization VARCHAR(50),
    projects INT DEFAULT 0
);

CREATE TABLE software_company.admin_cred (
	user_id VARCHAR(20),
    password VARCHAR (50)
);

CREATE TABLE software_company.projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(50),
    company_id INT,
    budget INT,
    notes VARCHAR(100),
    tasks INT DEFAULT 0,
    status VARCHAR(10) DEFAULT "ongoing",
    start_date DATE DEFAULT (current_date()),
    due_date DATE,
    FOREIGN KEY (company_id) REFERENCES software_company.client(id)
);


INSERT INTO software_company.admin_cred (user_id, password)
VALUES
	("admin","admin123");
    

INSERT INTO software_company.client (name, email, mobile, location, website, organization, projects)
VALUES
    ('ABC Corporation', 'abc@example.com', '1234567890', 'New York', 'http://www.abc.com', 'PRIVATE', 1),
    ('XYZ Industries', 'info@xyz.com', '4567890123', 'Los Angeles', 'http://www.xyzindustries.com', 'PRIVATE',2),
    ('Tech Solutions Ltd.', 'info@techsolutions.com', '7890123456', 'San Francisco', 'http://www.techsolutions.com', 'PRIVATE',1),
    ('Global Innovations Inc.', 'contact@globalinno.com', '2345678901', 'London', 'http://www.globalinnovations.com', 'PUBLIC',1),
    ('Innovate Now Ltd.', 'support@innovatenow.com', '5678901234', 'Berlin', 'http://www.innovatenow.com', 'PUBLIC',0);

INSERT INTO software_company.projects (project_name, company_id, budget, notes, due_date)
VALUES 
    ('Project Alpha', 1, 5000, 'Initial project for client X', '2024-09-30'),
    ('Project Beta', 2, 8000, 'Expansion project for client Y', '2024-09-30'),
    ('Project Cherry', 3, 12000, 'Enhancement project for client Z', '2024-12-31'),
    ('Project Diary', 4, 10000, 'Critical project for client X', '2024-10-31'),
    ('Project Eclipse', 2, 15000, 'Major project for client Y', '2025-03-31');


SELECT * FROM software_company.client;
SELECT * FROM software_company.admin_cred;
SELECT * FROM software_company.projects;