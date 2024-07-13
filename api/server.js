const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const pdfkit = require("pdfkit");
const fs = require("fs");

const app = express();
const port = 3005;

// MYSQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vishnuthangaraj",
  database: "software_company",
});

app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Gmail API
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vishnuthangaraj.vedhanthi@gmail.com",
    pass: `cyrd rdon nvaa falc`,
  },
});

// ADD NEW CLIENT
app.post(`/api/add_client`, (req, res) => {
  const { name, email, mobile, location, website, organization } = req.body;

  connection.query(
    `INSERT INTO client (name, email, mobile, location, website, organization) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, mobile, location, website, organization],
    (err, result) => {
      if (err) {
        console.error("Error Inserting Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to add client. Please try again later.",
        });
      } else {
        res.json({ success: true, message: "Client added successfully" });
      }
    }
  );
});

// ADD NEW PROJECT
app.post(`/api/add_project`, (req, res) => {
  const { project_name, company_id, budget, notes, due_date, team_lead_id } =
    req.body;

  connection.query(
    `INSERT INTO projects (project_name, company_id, budget, notes, due_date, team_lead_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [project_name, company_id, budget, notes, due_date, team_lead_id],
    (err, result) => {
      if (err) {
        console.error("Error Inserting Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to add Project. Please try again later.",
        });
      } else {
        res.json({ success: true, message: "Project added successfully" });
      }
    }
  );
});

// ADD NEW TASK
app.post(`/api/add_task`, (req, res) => {
  const { name, description, employee_id, priority, due_date, project_id } =
    req.body;

  connection.query(
    `INSERT INTO task (name, description, employee_id, priority, due_date, project_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, employee_id, priority, due_date, project_id],
    (err, result) => {
      if (err) {
        console.error("Error Inserting Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to add Task. Please try again later.",
        });
      } else {
        res.json({ success: true, message: "Task added successfully" });
      }
    }
  );
});

// ADD NEW TEAMLEAD
app.post(`/api/add_teamlead`, (req, res) => {
  const { name, email, phone, age, gender, address, designation } = req.body;

  connection.query(
    `INSERT INTO team_lead (name, email, phone, age, gender, address, designation, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, age, gender, address, designation, `${name}+123`],
    (err, result) => {
      if (err) {
        console.error("Error Inserting Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to add Teamlead. Please try again later.",
        });
      } else {
        res.json({ success: true, message: "Teamlead added successfully" });
      }
    }
  );
});

// ADD NEW EMPLOYEE
app.post(`/api/add_employee`, (req, res) => {
  const {
    name,
    email,
    phone,
    age,
    gender,
    address,
    designation,
    team_lead_id,
  } = req.body;

  connection.query(
    `INSERT INTO employee (name, email, phone, age, gender, address, designation, team_lead_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      phone,
      age,
      gender,
      address,
      designation,
      team_lead_id,
      `${name}+123`,
    ],
    (err, result) => {
      if (err) {
        console.error("Error Inserting Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to add Employee. Please try again later.",
        });
      } else {
        res.json({ success: true, message: "Employee added successfully" });
      }
    }
  );
});

// FETCH EMPLOYEE DATA
app.get(`/api/get_employee`, (req, res) => {
  connection.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch Employee. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH EMPLOYEE DATA (TEAMLEAD)
app.post(`/api/get_employee_tl`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM employee WHERE team_lead_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Employee. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH TEAM LEAD
app.get(`/api/get_teamlead`, (req, res) => {
  connection.query(`SELECT * FROM team_lead`, (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch Team Lead. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH CLIENT DETAILS
app.get(`/api/get_clients`, (req, res) => {
  connection.query(`SELECT * FROM client`, (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch client. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH PROJECT DETAILS
app.get(`/api/get_projects`, (req, res) => {
  connection.query(`SELECT * FROM projects`, (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch Projects. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH TASK DETAILS
app.get(`/api/get_task`, (req, res) => {
  connection.query(`SELECT * FROM task`, (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch Task. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH TASK WITH TEAMLEAD ID
app.post(`/api/get_task_tl_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT t.id AS id,
       t.name AS name,
       t.description AS description,
       t.status AS status,
       t.priority AS priority,
       t.start_date AS start_date,
       t.due_date AS due_date
    FROM software_company.task AS t
    JOIN software_company.employee AS e ON t.employee_id = e.id
    JOIN software_company.team_lead AS tl ON e.team_lead_id = tl.id
    WHERE tl.id = ?;`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Task. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH COUNT OF EMPLOYEE WITHOUT TASK
app.get(`/api/get_bench_employee_count`, (req, res) => {
  connection.query(
    `SELECT count(e.id) AS bench FROM employee e LEFT JOIN task t ON e.id = t.employee_id WHERE t.employee_id IS NULL;`,
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Employee Count. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH COUNT OF EMPLOYEE WITHOUT TASK (TEAMLEAD)
app.post(`/api/get_bench_employee_count_tl`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT count(e.id) AS bench FROM employee e LEFT JOIN task t ON e.id = t.employee_id WHERE t.employee_id IS NULL AND e.team_lead_id = ?;`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Employee Count. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH CLIENT NAME WITH ID
app.post(`/api/get_client_name`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT name FROM client WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Company Name. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH PROJECT WITH CLIENT ID
app.post(`/api/get_project_with_client_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM projects WHERE company_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Project Data. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH PROJECT WITH ID
app.post(`/api/get_project_with_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM projects WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Project Data. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH PROJECT WITH TEAMLEAD ID
app.post(`/api/get_projects_teamlead_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM projects WHERE team_lead_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Project Data. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH PROJECT WITH MEMBER ID (MEMBER)
app.post(`/api/get_projects_member_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT p.id, p.project_name, p.company_id, p.budget, p.notes, p.team_lead_id, p.status, p.start_date, p.due_date
      FROM software_company.projects p
      JOIN software_company.team_lead tl ON p.team_lead_id = tl.id
      JOIN software_company.employee e ON tl.id = e.team_lead_id
      WHERE e.id = ?;`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Project Data. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH MEMBERS WITH TASK USING TEAMLEAD ID(TEAMLEAD)
app.post(`/api/get_employee_task_tl`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT e.id AS employee_id,
       e.name AS employee_name,
       COUNT(t.id) AS task_count
      FROM software_company.employee AS e
      LEFT JOIN software_company.task AS t ON e.id = t.employee_id
      WHERE e.team_lead_id = ?
      GROUP BY e.id, e.name
      ORDER BY e.name;`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Employee Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Employee Data. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH TASK WITH ID
app.post(`/api/get_task_with_id`, (req, res) => {
  const { id } = req.body;

  connection.query(`SELECT * FROM task WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch Task Details. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH TASK WITH PROJECT ID
app.post(`/api/task_with_projectid`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM task WHERE project_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Task Details. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH TASK WITH EMPLOYEE ID
app.post(`/api/task_with_employeeid`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM task WHERE employee_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Task Details. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH ALL TEAM LEAD NAMES
app.get(`/api/get_teamlead_id_name`, (req, res) => {
  connection.query(`SELECT id, name FROM team_lead`, (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Teamlead Data. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH ALL CLIENT NAMES
app.get(`/api/get_all_client_names_id`, (req, res) => {
  connection.query(`SELECT id, name FROM client`, (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch Client Names. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH ALL EMPLOYEE WITH ID
app.post(`/api/get_employee_with_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM employee WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Employee Details. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH EVENTS USING DATE
app.post(`/api/get_events`, (req, res) => {
  const { date } = req.body;

  connection.query(
    `SELECT 
    e.id AS event_id,
    e.name AS event_name,
    e.evnt_date AS event_date,
    e.access AS event_access,
    COUNT(DISTINCT p.id) AS project_count,
    COUNT(t.id) AS task_count
    FROM
        software_company.events e
    LEFT JOIN
        software_company.projects p ON e.evnt_date = p.due_date
    LEFT JOIN
        software_company.task t ON p.id = t.project_id AND e.evnt_date = t.due_date
    WHERE
        e.evnt_date = ?
    GROUP BY
        e.id, e.name, e.evnt_date, e.access;
    `,
    [date],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Events. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH EVENTS USING DATE
app.post(`/api/get_events_count`, (req, res) => {
  const { date } = req.body;

  connection.query(
    `SELECT
        COUNT(DISTINCT p.id) AS project_count,
        COUNT(DISTINCT e.id) AS event_count,
        COUNT(DISTINCT t.id) AS task_count
    FROM
        software_company.projects p
        LEFT JOIN software_company.events e ON p.id = e.id
        LEFT JOIN software_company.task t ON p.id = t.project_id
    WHERE
        p.due_date = ?
        OR e.evnt_date = ?
        OR t.due_date = ?`,
    [date, date, date],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Events. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH TEAMLEAD WITH ID
app.post(`/api/get_teamlead_with_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM team_lead WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch TeamLead Details. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// FETCH CLIENT DETAILS WITH ID
app.post(`/api/get_client_with_id`, (req, res) => {
  const { id } = req.body;

  connection.query(`SELECT * FROM client WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error Fetching Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Fetch Client Names. Please try again later.",
      });
    } else {
      res.json(result);
    }
  });
});

// FETCH EMPLOYEE NAME WITH ID
app.post(`/api/get_employee_with_id`, (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT * FROM employee WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Fetching Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Fetch Employee Name. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// UPDATE CLIENT WITH ID
app.put(`/api/update_client_with_id`, (req, res) => {
  const { id, name, email, mobile, location, website, organization } = req.body;

  connection.query(
    `UPDATE client SET name = ?, email = ?, mobile =?, location = ?, website = ?, organization = ? WHERE id = ?`,
    [name, email, mobile, location, website, organization, id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Client Details. Please try again later.",
        });
      } else {
        res.json({ message: "Client updated successfully", success: true });
      }
    }
  );
});

// UPDATE TASK WITH ID
app.put(`/api/edit_task_with_id`, (req, res) => {
  const { name, description, employee_id, project_id, priority, due_date, id } =
    req.body;

  connection.query(
    `UPDATE task SET name = ?, description = ?, employee_id =?, project_id = ?, priority = ?, due_date = ? WHERE id = ?`,
    [name, description, employee_id, project_id, priority, due_date, id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Task Details. Please try again later.",
        });
      } else {
        res.json({ message: "Task updated successfully", success: true });
      }
    }
  );
});

// UPDATE TASK STATUS WITH ID
app.put(`/api/update_task_status`, (req, res) => {
  const { id, status, percentage } = req.body;

  connection.query(
    `UPDATE task SET status = ?, percentage = ? WHERE id = ?`,
    [status, percentage, id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Task Details. Please try again later.",
        });
      } else {
        res.json({ message: "Task updated successfully", success: true });
      }
    }
  );
});

// UPDATE TASK STATUS WITH ID
app.put(`/api/update_task_status_comment`, (req, res) => {
  const { id, status, percentage, comment } = req.body;

  connection.query(
    `UPDATE task SET status = ?, percentage = ?, comments = ? WHERE id = ?`,
    [status, percentage, comment, id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Task Details. Please try again later.",
        });
      } else {
        res.json({ message: "Task updated successfully", success: true });
      }
    }
  );
});

// UPDATE PROJECT WITH ID
app.put(`/api/update_project_with_id`, (req, res) => {
  const {
    id,
    project_name,
    company_id,
    budget,
    notes,
    team_lead_id,
    due_date,
    status,
  } = req.body;

  connection.query(
    `UPDATE projects SET project_name = ?, company_id = ?, budget =?, notes = ?, team_lead_id = ?, due_date = ?, status = ? WHERE id = ?`,
    [
      project_name,
      company_id,
      budget,
      notes,
      team_lead_id,
      due_date,
      status,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Project Details. Please try again later.",
        });
      } else {
        res.json({ message: "Project updated successfully", success: true });
      }
    }
  );
});

// UPDATE PROJECT WITH ID (TEAMLEAD)
app.put(`/api/update_project_id_tl`, (req, res) => {
  const { id, project_name, company_id, budget, notes, due_date, status } =
    req.body;

  connection.query(
    `UPDATE projects SET project_name = ?, company_id = ?, budget =?, notes = ?, due_date = ?, status = ? WHERE id = ?`,
    [project_name, company_id, budget, notes, due_date, status, id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Project Details. Please try again later.",
        });
      } else {
        res.json({ message: "Project updated successfully", success: true });
      }
    }
  );
});

// UPDATE EMPLOYEE WITH ID
app.put(`/api/update_employee_with_id`, (req, res) => {
  const {
    id,
    name,
    email,
    phone,
    age,
    gender,
    address,
    designation,
    team_lead_id,
  } = req.body;

  connection.query(
    `UPDATE employee SET name = ?, email = ?, phone =?, age = ?, gender = ?, address = ?, designation = ?, team_lead_id = ?  WHERE id = ?`,
    [name, email, phone, age, gender, address, designation, team_lead_id, id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Employee Details. Please try again later.",
        });
      } else {
        res.json({ message: "Employee updated successfully", success: true });
      }
    }
  );
});

// UPDATE TEAMLEAD WITH ID
app.put(`/api/update_teamlead_with_id`, (req, res) => {
  const { id, name, email, phone, age, gender, address, designation } =
    req.body;

  connection.query(
    `UPDATE team_lead SET name = ?, email = ?, phone =?, age = ?, gender = ?, address = ?, designation = ? WHERE id = ?`,
    [name, email, phone, age, gender, address, designation, id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Update Teamlead Details. Please try again later.",
        });
      } else {
        res.json({ message: "Teamlead updated successfully", success: true });
      }
    }
  );
});

// DELETE CLIENT USING ID
app.delete(`/api/delete_client`, (req, res) => {
  const { id } = req.body;
  connection.query(`DELETE FROM client WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error Deleting Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Delete client. Please try again later.",
      });
    } else {
      res.json({ success: true });
    }
  });
});

// DELETE PROJECT USING ID
app.delete(`/api/delete_project`, (req, res) => {
  const { id } = req.body;
  connection.query(`DELETE FROM projects WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error Deleting Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Delete Project. Please try again later.",
      });
    } else {
      res.json({ success: true });
    }
  });
});

// DELETE TEAM LEAD USING ID
app.delete(`/api/delete_teamlead`, (req, res) => {
  const { id } = req.body;
  connection.query(
    `DELETE FROM team_lead WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error Deleting Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Delete Team Lead. Please try again later.",
        });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// DELETE EMPLOYEE USING ID
app.delete(`/api/delete_employee`, (req, res) => {
  const { id } = req.body;
  connection.query(`DELETE FROM employee WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error Deleting Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Delete Employee. Please try again later.",
      });
    } else {
      res.json({ success: true });
    }
  });
});

// DELETE TASK USING ID
app.delete(`/api/delete_task`, (req, res) => {
  const { id } = req.body;
  connection.query(`DELETE FROM task WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error Deleting Data:", err);
      res.status(500).json({
        success: false,
        error: "Failed to Delete Task. Please try again later.",
      });
    } else {
      res.json({ success: true });
    }
  });
});

// SEND MAIL TO COMPANY
app.post("/api/company_mail", async (req, res) => {
  try {
    let { to, subject, message } = req.body;
    subject = `${subject} | Buffer Loop`;
    let text = message;

    await transporter.sendMail({
      from: "vishnuthangaraj.vedhanthi@gmail.com",
      to,
      subject,
      text,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: true, error: "Internal server error" });
  }
});

// ADMIN LOGIN
app.post("/api/admin_login", (req, res) => {
  const { user_id, password } = req.body;

  connection.query(
    `SELECT * FROM admin_cred WHERE user_id = ? and password = ?`,
    [user_id, password],
    (err, result) => {
      if (err) {
        console.error("Error Validating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Validate Admin. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// TEAMLEAD LOGIN
app.post("/api/teamlead_login", (req, res) => {
  const { user_id, password } = req.body;

  connection.query(
    `SELECT * FROM team_lead WHERE id = ? and password = ?`,
    [user_id, password],
    (err, result) => {
      if (err) {
        console.error("Error Validating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Validate Teamlead Task. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

// EMPLOYEE LOGIN
app.post("/api/employee_login", (req, res) => {
  const { user_id, password } = req.body;

  connection.query(
    `SELECT * FROM employee WHERE id = ? and password = ?`,
    [user_id, password],
    (err, result) => {
      if (err) {
        console.error("Error Validating Data:", err);
        res.status(500).json({
          success: false,
          error: "Failed to Validate Employee. Please try again later.",
        });
      } else {
        res.json(result);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
