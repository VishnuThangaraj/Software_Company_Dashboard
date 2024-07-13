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

CREATE TABLE software_company.events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(100),
    evnt_date DATE, 
    access VARCHAR(50) -- private or public
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
    ('Project Alpha', 1, 5000, 'Initial project for client X', '2024-07-5',1, 'ongoing'),
    ('Project Beta', 2, 8000, 'Expansion project for client Y', '2024-07-9',2, 'ongoing'),
    ('Project Cherry', 3, 12000, 'Enhancement project for client Z', '2024-07-6',3, 'completed'),
    ('Project Diary', 4, 10000, 'Critical project for client X', '2024-07-15',4, 'ongoing'),
    ('Project Eclipse', 2, 15000, 'Major project for client Y', '2025-07-29',5, 'completed');


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

INSERT INTO software_company.events (name, description, evnt_date, access) VALUES
('Summer Hackathon', 'Annual hackathon event for developers and tech enthusiasts.', '2024-07-01', 'private'),
('Product Launch Seminar', 'Introduction of new products with keynote speakers and demos.', '2024-07-02', 'public'),
('Client Appreciation Dinner', 'Exclusive dinner event to thank our valuable clients.', '2024-07-25', 'private'),
('Community Outreach Day', 'Volunteer activities and support for local communities.', '2024-07-04', 'public'),
('Team Building Workshop', 'Engaging activities to foster teamwork and collaboration.', '2024-07-15', 'other'),
('Company Strategy Review', 'Discussion on company goals and future plans.', '2024-07-06', 'private'),
('Customer Feedback Forum', 'Gathering customer input for product improvement.', '2024-07-07', 'public'),
('Industry Conference', 'Attending sessions on latest trends and innovations.', '2024-07-07', 'other'),
('Summer Picnic', 'Outdoor event with games, food, and fun for all employees.', '2024-07-09', 'private'),
('Educational Workshop', 'Learning sessions on new technologies and skills.', '2024-07-29', 'public'),
('Employee Recognition Ceremony', 'Awarding outstanding employees for their contributions.', '2024-07-11', 'private'),
('Product Demo Day', 'Showcasing new products to potential clients and partners.', '2024-07-12', 'public'),
('Charity Fundraiser', 'Raising funds for a local charity organization.', '2024-07-13', 'other'),
('Health & Wellness Day', 'Activities promoting physical and mental well-being.', '2024-07-14', 'private'),
('Technical Training Session', 'Hands-on training on advanced technical skills.', '2024-07-15', 'public'),
('Networking Mixer', 'Opportunity to connect with industry peers and professionals.', '2024-07-23', 'other'),
('Quarterly Review Meeting', 'Reviewing quarterly performance and goals.', '2024-07-17', 'private'),
('Annual General Meeting', 'Meeting with shareholders to discuss company progress.', '2024-07-18', 'public'),
('Project Kickoff Event', 'Launching a new project with key stakeholders.', '2024-07-19', 'other'),
('Investor Relations Day', 'Presenting company financials and growth strategies.', '2024-07-25', 'private');


SELECT * FROM software_company.client;
SELECT * FROM software_company.admin_cred;
SELECT * FROM software_company.projects;
SELECT * FROM software_company.team_lead;
SELECT * FROM software_company.employee;
SELECT * FROM software_company.task;
SELECT * FROM software_company.events;

SELECT
    (SELECT COUNT(*) FROM software_company.events WHERE evnt_date = '2024-07-28') AS event_count,
    (SELECT COUNT(*) FROM software_company.projects WHERE due_date = '2024-07-28') AS project_count,
    (SELECT COUNT(*) FROM software_company.task WHERE due_date = '2024-07-28') AS task_count; 