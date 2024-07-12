const project_table = document.getElementById(`project_table`);
const hiding_over_project = document.getElementById(`hiding_over_project`);
const project_no_data = document.getElementById(`project_no_data`);
const delete_overlay_project = document.getElementById(
  `delete_overlay_project`
);
const hide_view_project = document.getElementById(`hide_view_project`);

// TOP COUNTERS
const total_project = document.getElementById(`total_project`);
const ongoing_project = document.getElementById(`ongoing_project`);
const completed_project = document.getElementById(`completed_project`);
const revenue_project = document.getElementById(`revenue_project`);

// ADD NEW PROJECT
const add_new_project = document.getElementById(`add_new_project`);
const new_project_name = document.getElementById(`new_project_name`);
const new_project_project = document.getElementById(`new_project_clients`);
const add_project_end_date = document.getElementById(`add_project_end_date`);
const teamlead_list_project = document.getElementById(`teamlead_list_project`);
const add_project_budget = document.getElementById(`add_project_budget`);
const new_project_desc = document.getElementById(`new_project_desc`);

// EDIT PROJECT
let current_edit_project = 0;
const edit_project = document.getElementById(`edit_project`);
const edit_project_name = document.getElementById(`edit_project_name`);
const edit_project_clients = document.getElementById(`edit_project_clients`);
const edit_project_end_date = document.getElementById(`edit_project_end_date`);
const edit_teamlead_list_project = document.getElementById(
  `edit_teamlead_list_project`
);
const edit_project_budget = document.getElementById(`edit_project_budget`);
const edit_project_desc = document.getElementById(`edit_project_desc`);
const edit_status_project = document.getElementById(`edit_status_project`);

// VIEW PROJECT
const show_project_name = document.getElementById(`show_project_name`);
const project_details_table = document.getElementById(`project_details_table`);
const no_data_view_project = document.getElementById(`no_data_view_project`);

// MAKE PROEJCTS READY
const setup_project = async () => {
  let total_project_count = 0,
    ongoing_project_count = 0,
    completed_project_count = 0,
    revenue_project_count = 0;

  try {
    // Fetch all projects
    const projectsResponse = await fetch(
      `${localhost}/api/get_projects_member_id`,
      {
        method: "POST",
        body: JSON.stringify({
          id: developer_id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const projectsJson = await projectsResponse.json();

    let temp = `<tr>
                    <th style="width: 5%">ID</th>
                    <th style="width: 8%">Project Name</th>
                    <th style="width: 10%">Parent Company</th>
                    <th style="width: 7%">TeamLead</th>
                    <th style="width: 5%">Tasks</th>
                    <th style="width: 6%">Status</th>
                    <th style="width: 5%">Budget</th>
                    <th style="width: 7%">Due Date</th>
                    <th style="width: 8%">Action</th>
                </tr>`;

    if (projectsJson.length > 0) {
      total_project_count = projectsJson.length;

      // Array to store promises for fetching client names and project counts
      const fetchClientNamesAndTasks = projectsJson.map(async (project) => {
        // Fetch client name for each project
        const clientNameResponse = await fetch(
          `${localhost}/api/get_client_name`,
          {
            method: "POST",
            body: JSON.stringify({
              id: project.company_id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const clientNameJson = await clientNameResponse.json();
        const clientName =
          clientNameJson.length > 0 ? clientNameJson[0].name : "";

        // Fetch tasks count for each project
        const projectsWithClientResponse = await fetch(
          `${localhost}/api/task_with_projectid`,
          {
            method: "POST",
            body: JSON.stringify({
              id: project.id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const projectsWithClientJson = await projectsWithClientResponse.json();
        const tasksCount = projectsWithClientJson.length;

        // Fetch team lead name for each project
        const teamLeadName = await fetchTeamLeadName(project.team_lead_id);

        return {
          clientName,
          tasksCount,
          teamLeadName,
        };
      });

      // Wait for all client names, tasks count, and team lead names fetches to complete
      const clientNamesAndTasks = await Promise.all(fetchClientNamesAndTasks);

      projectsJson.forEach((project, index) => {
        const { clientName, tasksCount, teamLeadName } =
          clientNamesAndTasks[index];

        temp += `<tr id="${
          project.id
        }" class="border-bottom" onclick="view_tasks(event)">
                    <td>PROJ-BL${project.id}</td>
                    <td>${project.project_name}</td>
                    <td>${clientName}</td>
                    <td>${teamLeadName}</td>
                    <td>&nbsp;&nbsp;&nbsp;${tasksCount}</td>
                    <td>${
                      project.status === "ongoing"
                        ? '<span class="badge badge-warning">ONGOING</span>'
                        : '<span class="badge badge-success">COMPLETED</span>'
                    }</td>
                    <td>&nbsp;${project.budget}</td>
                    <td>${formatDate(project.due_date.slice(0, 10))}</td>
                    <td>
                      <div class="btn btn-secondary py-1 my-2 px-3 me-2" onclick="visible_edit_project(event)">
                        <i class="far fa-edit"></i>
                      </div>
                      <div class="btn btn-danger py-1 my-2 px-3" onclick="delete_project(event)">
                        <i class="fas fa-trash-alt"></i>
                      </div>
                    </td>
                  </tr>`;

        // Increment counts based on project status
        if (project.status === "ongoing") {
          ongoing_project_count++;
        } else {
          completed_project_count++;
          revenue_project_count += project.budget;
        }
      });

      // Update totals and counts
      total_project.innerHTML = total_project_count;
      ongoing_project.innerHTML = ongoing_project_count;
      completed_project.innerHTML = completed_project_count;
      revenue_project.innerHTML = `+ ${Math.floor(
        revenue_project_count / 1000
      )} K`;

      // Update the table once all data is processed
      project_table.innerHTML = temp;
    } else {
      project_table.innerHTML = temp;
      project_no_data.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to fetch team lead name asynchronously
const fetchTeamLeadName = async (teamLeadId) => {
  try {
    const response = await fetch(`${localhost}/api/get_teamlead_with_id`, {
      method: "POST",
      body: JSON.stringify({
        id: teamLeadId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    return json.length > 0 ? json[0].name : "";
  } catch (error) {
    console.error("Error fetching team lead name:", error);
    return ""; // Return empty string if an error occurs
  }
};

// EDIT EXISTING PROJECT
const visible_edit_project = (event) => {
  event.stopPropagation();

  let content = {
    url: "member.html",
    target: "_blank",
  };
  let alert_type = "";
  content.message = "Not Allowed to Edit Project";
  content.title = "Access Denied";
  content.icon = "fas fa-ban";
  alert_type = "secondary";

  $.notify(content, {
    type: alert_type,
    placement: {
      from: `top`,
      align: `center`,
    },
    time: 100,
    delay: 1000,
  });
};

// DELETE EXISTING PROJECT
const delete_project = async (event) => {
  event.stopPropagation();

  let content = {
    url: "member.html",
    target: "_blank",
  };
  let alert_type = "";
  content.message = "Not Allowed to remove Project from Database";
  content.title = "Access Denied";
  content.icon = "fas fa-ban";
  alert_type = "secondary";

  $.notify(content, {
    type: alert_type,
    placement: {
      from: `top`,
      align: `center`,
    },
    time: 100,
    delay: 1000,
  });
};

// VIEW TASK OF THE CURRENT PROJECT
const view_tasks = (event) => {
  let parent = event.target;
  while (parent.id == "") parent = parent.parentNode;

  console.log(parent.id);
  hide_view_project.style.display = "block";

  // Fetch project Name
  fetch(`${localhost}/api/get_project_with_id`, {
    method: "POST",
    body: JSON.stringify({
      id: parent.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      show_project_name.innerHTML = `${json[0].project_name}`;
    })
    .catch((error) => {
      console.error("Error fetching project details:", error);
    });

  // Fetch tasks associated with the project
  fetch(`${localhost}/api/task_with_projectid`, {
    method: "POST",
    body: JSON.stringify({
      id: parent.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((tasks) => {
      if (tasks.length > 0) {
        let temp = `<tr>
                      <th style="width: 7%;">TaskID</th>
                      <th style="width: 13%;">Name</th>
                      <th style="width: 8%;">Status</th>
                      <th style="width: 10%;">Due Date</th>
                      <th style="width: 12%;">Member</th>
                    </tr>`;

        // Use Promise.all to handle asynchronous employee detail fetching
        const fetchEmployees = tasks.map((data) => {
          return fetch(`${localhost}/api/get_employee_with_id`, {
            method: "POST",
            body: JSON.stringify({
              id: data.employee_id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((employee) => {
              // Update the temp HTML with employee name
              temp += `<tr class="border-bottom">`;
              temp += `<td>TSK-BL${data.id}</td>`;
              temp += `<td>${data.name}</td>`;
              if (data.status == "Progress") {
                temp += `<td><span class="badge badge-warning">IN PROGRESS</span></td>`;
              } else if (data.status == "Completed") {
                temp += `<td><span class="badge badge-success">COMPLETED</span></td>`;
              } else {
                temp += `<td><span class="badge badge-black">PENDING</span></td>`;
              }
              temp += `<td>${formatDate(data.due_date.slice(0, 10))}</td>`;
              temp += `<td>${employee[0].name}</td>`;
              temp += `</tr>`;
            })
            .catch((error) => {
              console.error("Error fetching employee details:", error);
            });
        });

        // After all fetches are complete, update the table
        Promise.all(fetchEmployees).then(() => {
          project_details_table.innerHTML = temp;
        });

        // Clear the "no tasks available" message
        no_data_view_project.innerHTML = "";
      } else {
        // No tasks available
        no_data_view_project.innerHTML = `<div class="fa-fade text-center no_tasks my-4">NO TASKS AVAILABLE</div>`;
        project_details_table.innerHTML = "";
      }
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
};

// HIDE PROJECT DETAILS
const hide_project_details = () => {
  hide_view_project.style.display = "none";
};

setup_project();
