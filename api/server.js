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
  } = req.body;

  connection.query(
    `UPDATE projects SET project_name = ?, company_id = ?, budget =?, notes = ?, team_lead_id = ?, due_date = ? WHERE id = ?`,
    [project_name, company_id, budget, notes, team_lead_id, due_date, id],
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
app.delete(`/api/delete_teamlead`, (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
