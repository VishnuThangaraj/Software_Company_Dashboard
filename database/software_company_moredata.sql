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
    designation VARCHAR(50)
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
    start_date DATE DEFAULT (current_date()),
    due_date DATE,
    FOREIGN KEY (employee_id) REFERENCES software_company.employee(id),
    FOREIGN KEY (project_id) REFERENCES software_company.projects(id)
);

INSERT INTO software_company.admin_cred (user_id, password)
VALUES
	("admin","admin123");
    
INSERT INTO software_company.client (name, email, mobile, location, website, organization) VALUES
    ('ABC Corporation', 'abc@example.com', '1234567890', 'New York', 'http://www.abc.com', 'PRIVATE'),
    ('XYZ Industries', 'info@xyz.com', '4567890123', 'Los Angeles', 'http://www.xyzindustries.com', 'PRIVATE'),
    ('Tech Solutions Ltd.', 'info@techsolutions.com', '7890123456', 'San Francisco', 'http://www.techsolutions.com', 'PRIVATE'),
    ('Global Innovations Inc.', 'contact@globalinno.com', '2345678901', 'London', 'http://www.globalinnovations.com', 'PUBLIC'),
    ('Innovate Now Ltd.', 'support@innovatenow.com', '5678901234', 'Berlin', 'http://www.innovatenow.com', 'PUBLIC'),
    ('Company A', 'info@companya.com', '1112223333', 'Paris', 'http://www.companya.com', 'PRIVATE'),
    ('Company B', 'info@companyb.com', '4445556666', 'Tokyo', 'http://www.companyb.com', 'PUBLIC'),
    ('Company C', 'info@companyc.com', '7778889999', 'Sydney', 'http://www.companyc.com', 'PRIVATE'),
    ('Company D', 'info@companyd.com', '9998887777', 'Moscow', 'http://www.companyd.com', 'PUBLIC'),
    ('Company E', 'info@companye.com', '6665554444', 'Beijing', 'http://www.companye.com', 'PRIVATE'),
    ('Company F', 'info@companyf.com', '3332221111', 'Toronto', 'http://www.companyf.com', 'PUBLIC'),
    ('Company G', 'info@companyg.com', '5556667777', 'Madrid', 'http://www.companyg.com', 'PRIVATE'),
    ('Company H', 'info@companyh.com', '8889990000', 'Dubai', 'http://www.companyh.com', 'PUBLIC'),
    ('Company I', 'info@companyi.com', '1231231234', 'Seoul', 'http://www.companyi.com', 'PRIVATE'),
    ('Company J', 'info@companyj.com', '4564564567', 'Rome', 'http://www.companyj.com', 'PUBLIC'),
    ('Company K', 'info@companyk.com', '7897897890', 'Osaka', 'http://www.companyk.com', 'PRIVATE'),
    ('Company L', 'info@companyl.com', '0980980987', 'Bangkok', 'http://www.companyl.com', 'PUBLIC'),
    ('Company M', 'info@companym.com', '6546546543', 'Singapore', 'http://www.companym.com', 'PRIVATE'),
    ('Company N', 'info@companyn.com', '3213213210', 'Hong Kong', 'http://www.companyn.com', 'PUBLIC'),
    ('Company O', 'info@companyo.com', '0001112222', 'Mumbai', 'http://www.companyo.com', 'PRIVATE');

INSERT INTO software_company.team_lead (name, email, phone, age, gender, address, designation) VALUES
    ('John Doe', 'john.doe@example.com', '1234567890', 35, 'Male', '123 Main St, Anytown', 'Angular Developer'),
    ('Jane Smith', 'jane.smith@example.com', '9876543210', 32, 'Female', '456 Oak Ave, Anycity', 'Dotnet Developer'),
    ('Michael Johnson', 'michael.john@example.com', '5551112222', 40, 'Male', '789 Elm St, Anystate', 'Java Developer'),
    ('Emily Brown', 'emily.brown@example.com', '3334445555', 28, 'Female', '321 Pine Rd, Anycity', 'Python Developer'),
    ('David Wilson', 'david.wilson@example.com', '6667778888', 45, 'Male', '555 Cedar Ln, Anytown', 'React Developer'),
    ('Chris Evans', 'chris.evans@example.com', '2223334444', 38, 'Male', '777 Maple Ave, Anytown', 'Vue.js Developer'),
    ('Sarah Parker', 'sarah.parker@example.com', '8887776666', 29, 'Female', '444 Oak St, Anycity', 'Node.js Developer'),
    ('Mark Thompson', 'mark.thompson@example.com', '4445556666', 37, 'Male', '666 Elm Rd, Anystate', 'PHP Developer'),
    ('Emma Roberts', 'emma.roberts@example.com', '7778889999', 31, 'Female', '888 Pine Ln, Anycity', 'Ruby on Rails Developer'),
    ('Paul Green', 'paul.green@example.com', '1112223333', 33, 'Male', '999 Cedar St, Anystate', 'Full Stack Developer'),
    ('Jennifer White', 'jennifer.white@example.com', '5554443333', 30, 'Female', '123 Maple Ave, Anycity', 'Backend Developer'),
    ('Robert Lee', 'robert.lee@example.com', '2221113333', 36, 'Male', '456 Oak Rd, Anystate', 'iOS Developer'),
    ('Sophia Clark', 'sophia.clark@example.com', '8889990000', 34, 'Female', '789 Pine Ln, Anytown', 'Android Developer'),
    ('Daniel Hill', 'daniel.hill@example.com', '7776665555', 39, 'Male', '321 Elm St, Anystate', 'UI/UX Designer'),
    ('Olivia Wright', 'olivia.wright@example.com', '3334445555', 27, 'Female', '555 Maple Ave, Anytown', 'Frontend Developer'),
    ('William Turner', 'william.turner@example.com', '9998887777', 42, 'Male', '987 Oak Rd, Anycity', 'DevOps Engineer'),
    ('Hannah Nelson', 'hannah.nelson@example.com', '1112223333', 26, 'Female', '234 Elm Rd, Anystate', 'Cloud Architect'),
    ('Jason King', 'jason.king@example.com', '4445556666', 41, 'Male', '678 Pine Ln, Anytown', 'Database Administrator'),
    ('Samantha Scott', 'samantha.scott@example.com', '7778889999', 32, 'Female', '876 Cedar St, Anycity', 'System Analyst'),
    ('Edward Hall', 'edward.hall@example.com', '2223334444', 43, 'Male', '345 Oak Ave, Anystate', 'Network Engineer');

INSERT INTO software_company.projects (project_name, company_id, budget, notes, due_date, team_lead_id, status) VALUES
    ('Project Alpha', 1, 5000, 'Initial project for client X', '2024-09-30', 1, 'ongoing'),
    ('Project Beta', 2, 8000, 'Expansion project for client Y', '2024-09-30', 2, 'ongoing'),
    ('Project Cherry', 3, 12000, 'Enhancement project for client Z', '2024-12-31', 3, 'completed'),
    ('Project Diary', 4, 10000, 'Critical project for client X', '2024-10-31', 4, 'ongoing'),
    ('Project Eclipse', 2, 15000, 'Major project for client Y', '2025-03-31', 5, 'completed'),
    ('Project Foxtrot', 1, 9000, 'New feature development', '2024-11-30', 1, 'ongoing'),
    ('Project Golf', 4, 11000, 'Mobile app development', '2024-12-15', 4, 'ongoing'),
    ('Project Hotel', 3, 13000, 'Web portal revamp', '2024-11-15', 3, 'ongoing'),
    ('Project India', 2, 7000, 'Backend system upgrade', '2024-08-31', 2, 'ongoing'),
    ('Project Juliet', 5, 18000, 'Enterprise solution deployment', '2025-01-31', 5, 'planned'),
    ('Project Kilo', 1, 9500, 'Database migration', '2024-10-15', 1, 'ongoing'),
    ('Project Lima', 3, 14000, 'AI integration', '2024-12-31', 3, 'planned'),
    ('Project Mike', 4, 10500, 'Security audit', '2024-09-15', 4, 'ongoing'),
    ('Project November', 5, 16000, 'Big data analytics platform', '2025-02-28', 5, 'planned'),
    ('Project Oscar', 2, 8200, 'CRM system enhancement', '2024-09-30', 2, 'ongoing'),
    ('Project Papa', 1, 8800, 'E-commerce platform upgrade', '2024-11-30', 1, 'planned'),
    ('Project Quebec', 3, 12500, 'IoT device integration', '2024-10-31', 3, 'ongoing'),
    ('Project Romeo', 4, 10200, 'Blockchain implementation', '2024-12-15', 4, 'planned'),
    ('Project Sierra', 2, 7700, 'Virtual reality application', '2024-08-31', 2, 'ongoing'),
    ('Project Tango', 5, 17000, 'Machine learning model development', '2025-01-31', 5, 'planned');

INSERT INTO software_company.employee (name, email, phone, age, gender, address, designation, team_lead_id) VALUES
    ('Alice Johnson', 'alice.johnson@example.com', '1112223333', 30, 'Female', '789 Oak St, Anycity, USA', 'React Developer', 1),
    ('Bob Smith', 'bob.smith@example.com', '4445556666', 25, 'Male', '456 Maple Ave, Anytown, USA', 'Java Developer', 2),
    ('Cathy Brown', 'cathy.brown@example.com', '7778889999', 28, 'Female', '321 Elm Rd, Anystate, USA', 'Angular Developer', 1),
    ('Daniel Wilson', 'daniel.wilson@example.com', '5556667777', 35, 'Male', '555 Pine Ln, Anycity, USA', 'Dotnet Developer', 3),
    ('Eve Taylor', 'eve.taylor@example.com', '8889990000', 27, 'Female', '987 Cedar St, Anystate, USA', 'Dotnet Developer', 2),
    ('Frank Harris', 'frank.harris@example.com', '1112223333', 29, 'Male', '234 Maple Ave, Anytown, USA', 'PHP Developer', 4),
    ('Gina Miller', 'gina.miller@example.com', '4445556666', 31, 'Female', '789 Elm Rd, Anystate, USA', 'iOS Developer', 3),
    ('Henry Young', 'henry.young@example.com', '7778889999', 32, 'Male', '876 Pine Ln, Anycity, USA', 'Android Developer', 5),
    ('Irene Baker', 'irene.baker@example.com', '2223334444', 34, 'Female', '567 Oak St, Anystate, USA', 'UI/UX Designer', 1),
    ('Jack Cooper', 'jack.cooper@example.com', '5556667777', 33, 'Male', '123 Elm Rd, Anycity, USA', 'Backend Developer', 2),
    ('Kelly Reed', 'kelly.reed@example.com', '8889990000', 31, 'Female', '456 Cedar St, Anystate, USA', 'Frontend Developer', 4),
    ('Leo Hall', 'leo.hall@example.com', '1112223333', 30, 'Male', '789 Maple Ave, Anytown, USA', 'Full Stack Developer', 3),
    ('Mia Turner', 'mia.turner@example.com', '4445556666', 28, 'Female', '321 Elm Rd, Anycity, USA', 'DevOps Engineer', 5),
    ('Nathan King', 'nathan.king@example.com', '7778889999', 27, 'Male', '987 Pine Ln, Anystate, USA', 'Cloud Architect', 1),
    ('Olivia Green', 'olivia.green@example.com', '2223334444', 26, 'Female', '555 Oak St, Anycity, USA', 'Database Administrator', 2),
    ('Peter Hill', 'peter.hill@example.com', '5556667777', 25, 'Male', '876 Elm Rd, Anystate, USA', 'System Analyst', 4),
    ('Queen Lee', 'queen.lee@example.com', '8889990000', 29, 'Female', '234 Maple Ave, Anytown, USA', 'Network Engineer', 3),
    ('Robert White', 'robert.white@example.com', '1112223333', 31, 'Male', '567 Cedar St, Anystate, USA', 'Security Engineer', 5),
    ('Samantha Scott', 'samantha.scott@example.com', '4445556666', 30, 'Female', '789 Elm Rd, Anycity, USA', 'Software Tester', 1),
    ('Tom Brown', 'tom.brown@example.com', '7778889999', 32, 'Male', '123 Pine Ln, Anystate, USA', 'Business Analyst', 2);

INSERT INTO software_company.task (name, description, employee_id, status, priority, due_date, project_id) VALUES
    ('Design homepage layout', 'Create a new design for the company homepage', 1, 'Progress', 'HIGH', '2024-07-20', 1),
    ('Implement login functionality', 'Develop login feature with OAuth integration', 2, 'Completed', 'MEDIUM', '2024-07-25', 1),
    ('Write API documentation', 'Document RESTful API endpoints for version 2.0', 3, 'Completed', 'LOW', '2024-07-15', 2),
    ('Bug fixing in user dashboard', 'Fix reported bugs in the user dashboard module', 4, 'Progress', 'HIGH', '2024-07-18', 3),
    ('Database schema optimization', 'Optimize database queries and indexes for performance', 4, 'Progress', 'MEDIUM', '2024-07-30', 4),
    ('Implement search feature', 'Add search functionality with Elasticsearch integration', 1, 'Pending', 'HIGH', '2024-08-05', 2),
    ('Develop user profile module', 'Create user profile management module', 2, 'Pending', 'MEDIUM', '2024-08-10', 3),
    ('Integration testing', 'Conduct integration testing for entire system', 3, 'Pending', 'LOW', '2024-08-15', 1),
    ('Performance tuning', 'Optimize application performance for large datasets', 4, 'Pending', 'HIGH', '2024-08-20', 4),
    ('Implement payment gateway', 'Integrate payment gateway with Stripe', 1, 'Pending', 'MEDIUM', '2024-08-25', 5),
    ('Design admin dashboard', 'Create UI/UX design for admin dashboard', 2, 'Pending', 'LOW', '2024-09-01', 2),
    ('Develop reporting module', 'Build reporting module for business analytics', 3, 'Pending', 'HIGH', '2024-09-05', 3),
    ('User acceptance testing', 'Perform UAT with client stakeholders', 4, 'Pending', 'MEDIUM', '2024-09-10', 1),
    ('Implement push notifications', 'Integrate push notification service', 1, 'Pending', 'LOW', '2024-09-15', 2),
    ('Refactor legacy code', 'Refactor legacy codebase for maintainability', 2, 'Pending', 'HIGH', '2024-09-20', 4),
    ('Develop mobile app prototype', 'Create prototype for mobile application', 3, 'Pending', 'MEDIUM', '2024-09-25', 5),
    ('Implement CI/CD pipeline', 'Set up continuous integration and deployment pipeline', 4, 'Pending', 'LOW', '2024-09-30', 3),
    ('Design RESTful APIs', 'Architect and design RESTful APIs', 1, 'Pending', 'HIGH', '2024-10-05', 2),
    ('Write unit tests', 'Develop comprehensive unit tests for code coverage', 2, 'Pending', 'MEDIUM', '2024-10-10', 1),
    ('Create documentation', 'Write technical documentation for developers', 3, 'Pending', 'LOW', '2024-10-15', 4);


SELECT * FROM software_company.client;
SELECT * FROM software_company.admin_cred;
SELECT * FROM software_company.projects;
SELECT * FROM software_company.team_lead;
SELECT * FROM software_company.employee;
SELECT * FROM software_company.task;