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

INSERT INTO software_company.client (name, email, mobile, location, website, organization)
VALUES
    ('ABC Corporation', 'abc@example.com', '123-456-7890', 'New York', 'http://www.abc.com', 'PRIVATE'),
    ('XYZ Industries', 'info@xyz.com', '456-789-0123', 'Los Angeles', 'http://www.xyzindustries.com', 'PRIVATE'),
    ('Tech Solutions Ltd.', 'info@techsolutions.com', '789-012-3456', 'San Francisco', 'http://www.techsolutions.com', 'PRIVATE'),
    ('Global Innovations Inc.', 'contact@globalinno.com', '234-567-8901', 'London', 'http://www.globalinnovations.com', 'PUBLIC'),
    ('Innovate Now Ltd.', 'support@innovatenow.com', '567-890-1234', 'Berlin', 'http://www.innovatenow.com', 'PUBLIC');

SELECT * FROM software_company.client;
SELECT name, email FROM software_company.client;