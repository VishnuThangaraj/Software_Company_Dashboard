const task_table = document.getElementById(`task_table`);

// Top Counters
const total_task_count = document.getElementById(`total_task_count`);
const pending_task_count = document.getElementById(`pending_task_count`);
const progress_task_count = document.getElementById(`progress_task_count`);
const completed_task_count = document.getElementById(`completed_task_count`);

const hiding_over_task = document.getElementById(`hiding_over_task`);

// Add new Task
const new_task_name = document.getElementById(`new_task_name`);
const new_task_description = document.getElementById(`new_task_description`);
const new_task_project = document.getElementById(`new_task_project`);
const new_task_priority = document.getElementById(`new_task_priority`);

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
        window.location.href = "http://127.0.0.1:5500/task.html";
      }, 3000);
    });
};
