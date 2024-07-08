const task_table = document.getElementById(`task_table`);
const hiding_over_task = document.getElementById(`hiding_over_task`);

// Top Counters
const total_task_count = document.getElementById(`total_task_count`);
const pending_task_count = document.getElementById(`pending_task_count`);
const progress_task_count = document.getElementById(`progress_task_count`);
const completed_task_count = document.getElementById(`completed_task_count`);

// Add new Task
const add_new_task = document.getElementById(`add_new_task`);
const new_task_name = document.getElementById(`new_task_name`);
const new_task_description = document.getElementById(`new_task_description`);
const new_task_project = document.getElementById(`new_task_project`);
const new_task_priority = document.getElementById(`new_task_priority`);
const new_task_user = document.getElementById(`new_task_user`);
const due_date_task = document.getElementById(`due_date_task`);

// Edit Existing Task
const edit_task_name = document.getElementById(`edit_task_name`);
const edit_task_description = document.getElementById(`edit_task_description`);
const edit_task_project = document.getElementById(`edit_task_project`);
const edit_task_priority = document.getElementById(`edit_task_priority`);
const edit_task_user = document.getElementById(`edit_task_user`);
const edit_date_task = document.getElementById(`edit_date_task`);

let current_editing_task = 1;

// Edit Task
const edit_task = document.getElementById(`edit_task`);

//////////// MAKE TASK TABLE READY ///////
const make_task_table_ready = () => {
  let total_task = 0,
    pending_task = 0,
    progress_task = 0,
    completed_task = 0;

  let temp = `<tr>
                <th style="width: 6%">ID</th>
                <th style="width: 9%">Name</th>
                <th style="width: 15%">Description</th>
                <th style="width: 2%">Priority</th>
                <th style="width: 7%">Due Date</th>
                <th style="width: 3%">Status</th>
                <th style="width: 8%">Action</th>
            </tr>`;

  fetch(`http://localhost:3005/api/get_task`)
    .then((response) => response.json())
    .then((data) => {
      total_task = data.length;
      data.forEach((task) => {
        let current_date = `${task.due_date.slice(0, 10)}`;
        temp += `<tr id="${task.id}" class="border-bottom">`;
        temp += `<td>TAS-BL${task.id}</td>`;
        temp += `<td>${task.name}</td>`;
        temp += `<td style="padding-inline-end:15px">${task.description}</td>`;
        if (task.priority == "HIGH") {
          temp += `<td><span class="badge badge-danger">HIGH</span></td>`;
        } else if (task.priority == "LOW") {
          temp += `<td><span class="badge badge-info">LOW</span></td>`;
        } else {
          temp += `<td><span class="badge badge-secondary">MEDIUM</span></td>`;
        }
        temp += `<td>${formatDate(current_date)}</td>`;
        if (task.status == "Completed") {
          completed_task++;
          temp += `<td> <span class="badge badge-success">COMPLETED</span> </td>`;
        } else if (task.status == "Progress") {
          progress_task++;
          temp += `<td> <span class="badge badge-warning">IN PROGRESS</span> </td>`;
        } else {
          pending_task++;
          temp += `<td> <span class="badge badge-black">PENDING</span> </td>`;
        }
        temp += `<td>
                    <div
                    class="btn btn-secondary me-1 px-3 py-1 my-2"
                    onclick = "view_edit_task_form(event)"
                    >
                    <i class="far fa-edit"></i>
                    </div>
                    <div class="btn px-3 py-1 btn-danger" onclick="delete_task(event)">
                    <i class="fas fa-trash-alt"></i>
                    </div>
                </td>`;
        temp += `</tr>`;
      });
      task_table.innerHTML = temp;
      total_task_count.innerHTML = total_task;
      pending_task_count.innerHTML = pending_task;
      progress_task_count.innerHTML = progress_task;
      completed_task_count.innerHTML = completed_task;
    });

  // Render Employee list
  fetch(`http://localhost:3005/api/get_employee`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        new_task_user.innerHTML = "";
        data.forEach((employee) => {
          let new_option = document.createElement("option");
          new_option.text = employee.name;
          new_option.value = employee.id;
          new_task_user.append(new_option);
        });
      } else {
        let new_option = document.createElement("option");
        new_option.text = `No Employee Available`;
        new_option.value = `No Employee Available`;
        new_task_user.append(new_option);
        new_task_user.disabled = true;
      }
    });

  // Render Project List
  fetch(`http://localhost:3005/api/get_projects`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        new_task_project.innerHTML = "";
        data.forEach((project) => {
          let new_option = document.createElement("option");
          new_option.text = project.project_name;
          new_option.value = project.id;
          new_task_project.append(new_option);
        });
      } else {
        let new_option = document.createElement("option");
        new_option.text = `No Project Available`;
        new_option.value = `No Project Available`;
        new_task_project.append(new_option);
        new_task_project.disabled = true;
      }
    });
};

make_task_table_ready();

/////////// DELETE TASK //////////
const delete_task = (event) => {
  hiding_over_task.style.display = "block";
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  fetch("http://localhost:3005/api/delete_task", {
    method: "DELETE",
    body: JSON.stringify({
      id: parent.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let content = {
        url: "task.html",
        target: "_blank",
      };
      let alert_type = "";
      if (data.success) {
        content.message =
          "The task has successfully been removed from the database.";
        content.title = "Task has been removed";
        content.icon = "fas fa-tasks";
        alert_type = "danger";
      } else {
        content.message = "Unable to remove the Task from the system.";
        content.title = "Failed to remove Task";
        content.icon = "fas fa-exclamation-circle";
        alert_type = "warning";
      }

      $.notify(content, {
        type: alert_type,
        placement: {
          from: `top`,
          align: `center`,
        },
        time: 100,
        delay: 1000,
      });

      setTimeout(function () {
        window.location.href = "/task.html";
      }, 3000);
    });
};

///////// ADD NEW TASK //////////////
const save_new_task = () => {
  hide_add_task_form();
  hiding_over_task.style.display = "none";
  fetch("http://localhost:3005/api/add_task", {
    method: "POST",
    body: JSON.stringify({
      name: new_task_name.value,
      description: new_task_description.value,
      employee_id: new_task_user.value,
      priority: new_task_priority.value,
      due_date: due_date_task.value,
      project_id: new_task_project.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {
        url: "task.html",
        target: "_blank",
      };
      let alert_type = "";
      if (json.success) {
        content.message = "A new Task has been added to the database.";
        content.title = "Task Added";
        content.icon = "fas fa-tasks";
        alert_type = "success";
      } else {
        content.message = "Failed to add project to the Database";
        content.title = "Failed to Add Task";
        content.icon = "fas fa-exclamation-circle";
        alert_type = "warning";
      }

      $.notify(content, {
        type: alert_type,
        placement: {
          from: `top`,
          align: `center`,
        },
        time: 100,
        delay: 1000,
      });

      setTimeout(function () {
        window.location.href = "/task.html";
      }, 3000);
    });
};

/////////// EDIT TASK //////////////
const update_task = () => {
  hide_edit_task_form();
  hiding_over_task.style.display = "block";

  fetch("http://localhost:3005/api/edit_task_with_id", {
    method: "PUT",
    body: JSON.stringify({
      id: current_editing_task,
      name: edit_task_name.value,
      description: edit_task_description.value,
      employee_id: edit_task_user.value,
      priority: edit_task_priority.value,
      due_date: edit_date_task.value,
      project_id: edit_task_project.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {
        url: "task.html",
        target: "_blank",
      };
      let alert_type = "";
      if (json.success) {
        content.message = "Task have been updated to the database.";
        content.title = "Task Updated";
        content.icon = "fas fa-tasks";
        alert_type = "success";
      } else {
        content.message = "Failed to Update Task in the Database";
        content.title = "Failed to Edit Task";
        content.icon = "fas fa-exclamation-circle";
        alert_type = "warning";
      }

      $.notify(content, {
        type: alert_type,
        placement: {
          from: `top`,
          align: `center`,
        },
        time: 100,
        delay: 1000,
      });

      setTimeout(function () {
        window.location.href = "/task.html";
      }, 3000);
    });
};

///////// HIDE ADD NEW TASK FORM ////////////
const hide_add_task_form = () => {
  add_new_task.style.display = "none";
};

///////// VIEW ADD NEW TASK FORM ////////////
const view_add_task_form = () => {
  add_new_task.style.display = "block";
};

///////// HIDE EDIT TASK FORM ////////////
const hide_edit_task_form = () => {
  edit_task.style.display = "none";
};

///////// VIEW EDIT TASK FORM ////////////
const view_edit_task_form = (event) => {
  edit_task_user.innerHTML = "";
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  // Fetch Task List With ID
  fetch("http://localhost:3005/api/get_task_with_id", {
    method: "POST",
    body: JSON.stringify({
      id: parent.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      edit_task_name.value = data[0].name;
      edit_task_description.value = data[0].description;
      edit_date_task.value = data[0].due_date.slice(0, 10);
    });

  // Render Employee list
  fetch(`http://localhost:3005/api/get_employee`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        data.forEach((employee) => {
          let new_option = document.createElement("option");
          new_option.text = employee.name;
          new_option.value = employee.id;
          edit_task_user.append(new_option);
        });
      } else {
        let new_option = document.createElement("option");
        new_option.text = `No Employee Available`;
        new_option.value = `No Employee Available`;
        edit_task_user.append(new_option);
        edit_task_user.disabled = true;
      }
    });

  // Render Project List
  fetch(`http://localhost:3005/api/get_projects`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        data.forEach((project) => {
          let new_option = document.createElement("option");
          new_option.text = project.project_name;
          new_option.value = project.id;
          edit_task_project.append(new_option);
        });
      } else {
        let new_option = document.createElement("option");
        new_option.text = `No Project Available`;
        new_option.value = `No Project Available`;
        edit_task_project.append(new_option);
        edit_task_project.disabled = true;
      }
    });

  current_editing_task = parent.id;
  console.log(current_editing_task);
  edit_task.style.display = "block";
};
