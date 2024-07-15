const task_table = document.getElementById(`task_table`);
const hiding_over_task = document.getElementById(`hiding_over_task`);
const resource_pool = document.getElementById(`resource_pool`);

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

// View Task
const hide_view_task = document.getElementById(`hide_view_task`);
const show_task_name = document.getElementById(`show_task_name`);
const percentage_show_task = document.getElementById(`percentage_show_task`);
const comment_show_task = document.getElementById(`comment_show_task`);

let current_editing_task = 1;

// Edit Task
const edit_task = document.getElementById(`edit_task`);

const delete_overlay_task = document.getElementById(`delete_overlay_task`);

// MAKE TASK TABLE READY
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

  fetch(`${localhost}/api/get_task`)
    .then((response) => response.json())
    .then((data) => {
      total_task = data.length;
      data.forEach((task) => {
        let current_date = `${task.due_date.slice(0, 10)}`;
        temp += `<tr id="${task.id}" class="border-bottom" onclick="view_pannel(event)">`;
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
  fetch(`${localhost}/api/get_employee`)
    .then((response) => response.json())
    .then((data) => {
      let temp = ``;
      if (data.length > 0) {
        new_task_user.innerHTML = "";
        data.forEach((employee) => {
          let new_option = document.createElement("option");
          new_option.text = employee.name;
          new_option.value = employee.id;
          new_task_user.append(new_option);

          // Resource Pool
          fetch(`${localhost}/api/task_with_employeeid`, {
            method: "POST",
            body: JSON.stringify({
              id: employee.id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              temp += `<div id="${
                employee.id
              }" class="border-bottom resource-txt py-2 rounded text-center my-flex-row">
                    <span class="pt-2 ${
                      data.length == 0 ? "make_green fa-fade" : ""
                    }">${employee.name} </span>
                    <span class="pt-2" >
                    <span class="badge badge-count">${data.length} Task</span>
                    </span>
                  </div>`;
              resource_pool.innerHTML = temp;
            });
        });
      } else {
        let new_option = document.createElement("option");
        new_option.text = `No Employee Available`;
        new_option.value = `No Employee Available`;
        new_task_user.append(new_option);
        new_task_user.disabled = true;
      }
      new_task_user.value = "";
    });

  // Render Project List
  fetch(`${localhost}/api/get_projects`)
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

// GET CONFIRMATION FOR DELETION
const get_delete_confirmation = () => {
  return new Promise((resolve) => {
    // Get the confirmation and cancel buttons
    const confirmationButton = document.getElementById("proceed_task_delete");
    const cancelButton = document.getElementById("cancel_task_delete");

    // Function to handle confirmation
    const handleConfirmation = () => {
      resolve(true); // Resolve with true when confirmation button is clicked
    };

    // Function to handle cancellation
    const handleCancellation = () => {
      resolve(false); // Resolve with false when cancel button is clicked
    };

    // Attach click event listeners to buttons
    confirmationButton.addEventListener("click", handleConfirmation);
    cancelButton.addEventListener("click", handleCancellation);
  });
};

// DELETE TASK
const delete_task = async (event) => {
  event.stopPropagation();
  delete_overlay_task.style.display = "block";

  let confirmation = await get_delete_confirmation();
  delete_overlay_task.style.display = "none"; // Hide SweetAlert

  if (!confirmation) {
    return;
  }

  hiding_over_task.style.display = "block";
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  fetch(`${localhost}/api/delete_task`, {
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

// ADD NEW TASK
const save_new_task = () => {
  const formElements = [
    new_task_name,
    new_task_description,
    new_task_user,
    new_task_priority,
    due_date_task,
    new_task_project,
  ];

  let validator = false;

  formElements.forEach((element) => {
    if (element.value === "" || element.value === `No Employee Available`) {
      element.style.border = "1px solid #f58389";
      validator = true;
    } else {
      element.style.border = "1px solid #6ddc70";
    }
  });

  if (validator) {
    // Notification
    let content = {
      message: "Please fill out all fields correctly to add a new Task.",
      title: "Incomplete Task Details",
      icon: "fas fa-tasks",
      url: "task.html",
      target: "_blank",
    };

    $.notify(content, {
      type: "warning",
      placement: {
        from: "top",
        align: "center",
      },
      time: 100,
      delay: 1000,
    });

    return;
  }

  hide_add_task_form();
  hiding_over_task.style.display = "block";

  fetch(`${localhost}/api/add_task`, {
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
        content.message =
          "A new task has been successfully added to the database.";
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

// EDIT TASK
const update_task = () => {
  const formElements = [
    edit_task_name,
    edit_task_description,
    edit_task_user,
    edit_task_priority,
    edit_date_task,
    edit_task_project,
  ];

  let validator = false;

  formElements.forEach((element) => {
    if (element.value === "") {
      element.style.border = "1px solid #f58389";
      validator = true;
    } else {
      element.style.border = "1px solid #6ddc70";
    }
  });

  if (validator) {
    // Notification
    let content = {
      message: "Please fill out all fields correctly to Edit Task.",
      title: "Incomplete Task Details",
      icon: "fas fa-tasks",
      url: "task.html",
      target: "_blank",
    };

    $.notify(content, {
      type: "warning",
      placement: {
        from: "top",
        align: "center",
      },
      time: 100,
      delay: 1000,
    });

    return;
  }

  hide_edit_task_form();
  hiding_over_task.style.display = "block";

  fetch(`${localhost}/api/edit_task_with_id`, {
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

// HIDE ADD NEW TASK FORM
const hide_add_task_form = () => {
  add_new_task.style.display = "none";
};

// VIEW ADD NEW TASK FORM
const view_add_task_form = () => {
  add_new_task.style.display = "block";
};

// RENDER MEMBERS TO ADD NEW TASK
const render_members = () => {
  new_task_user.innerHTML = "";
  fetch(`${localhost}/api/get_employee_tl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: new_task_project.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        new_task_user.disabled = false;
        data.forEach((employee) => {
          let new_option = document.createElement("option");
          new_option.text = `${employee.name}`;
          new_option.value = `${employee.id}`;
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
};

// RENDER MEMBERS TO ADD NEW TASK
const render_members_edit = () => {
  edit_task_user.innerHTML = "";
  edit_task_user.value = "";
  fetch(`${localhost}/api/get_employee_tl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: edit_task_project.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        edit_task_user.disabled = false;
        data.forEach((employee) => {
          let new_option = document.createElement("option");
          new_option.text = `${employee.name}`;
          new_option.value = `${employee.id}`;
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
};

// HIDE EDIT TASK FORM
const hide_edit_task_form = () => {
  edit_task.style.display = "none";
};

// VIEW EDIT TASK FORM
const view_edit_task_form = (event) => {
  event.stopPropagation();
  edit_task_user.innerHTML = "";
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  // Render Employee list
  fetch(`${localhost}/api/get_employee`)
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
  fetch(`${localhost}/api/get_projects`)
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

  render_members_edit();
  // Fetch Task List With ID
  fetch(`${localhost}/api/get_task_with_id`, {
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
      edit_task_priority.value = data[0].priority;
      edit_task_user.value = data[0].employee_id;
      edit_task_project.value = data[0].project_id;
    });

  current_editing_task = parent.id;
  edit_task.style.display = "block";
};

// DISPLAY VIEW PANNEL
const view_pannel = (event) => {
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  hide_view_task.style.display = "block";
  // Fetch Task Details
  fetch(`${localhost}/api/get_task_with_id`, {
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
      show_task_name.innerHTML = json[0].name;
      percentage_show_task.innerHTML = `${json[0].percentage} %`;
      comment_show_task.innerHTML = json[0].comments;
      console.log(json[0]);
    });
};

// HIDE TASK DETAILS
const hide_task_details = () => {
  hide_view_task.style.display = "none";
};

make_task_table_ready();
