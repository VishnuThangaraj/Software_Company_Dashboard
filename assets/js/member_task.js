const task_table = document.getElementById(`task_table`);
const hiding_over_task = document.getElementById(`hiding_over_task`);

// Top Counters
const total_task_count = document.getElementById(`total_task_count`);
const pending_task_count = document.getElementById(`pending_task_count`);
const progress_task_count = document.getElementById(`progress_task_count`);
const completed_task_count = document.getElementById(`completed_task_count`);

let current_editing_task = 1;

// Edit Task
const hide_view_mem_task = document.getElementById(`hide_view_mem_task`);

// Slider
const slider = document.getElementById("myRange");
const output = document.getElementById("sliderValue");

const delete_overlay_task = document.getElementById(`delete_overlay_task`);
const comment_task = document.getElementById(`comment_task`);

// MAKE TASK TABLE READY
const make_task_table_ready = () => {
  let total_task = 0,
    pending_task = 0,
    progress_task = 0,
    completed_task = 0;

  let temp = `<tr>
                <th style="width: 4%">ID</th>
                <th style="width: 10%">Name</th>
                <th style="width: 11%">Description</th>
                <th style="width: 7%">Project</th>
                <th style="width: 2%">Priority</th>
                <th style="width: 5%">Completion</th>
                <th style="width: 7%">Due Date</th>
                <th style="width: 3%">Status</th>
                <th style="width: 8%">Action</th>
            </tr>`;

  fetch(`${localhost}/api/task_with_employeeid`, {
    method: "POST",
    body: JSON.stringify({
      id: developer_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((tasks) => {
      total_task = tasks.length;
      return Promise.all(
        tasks.map((task) => {
          return fetch(`${localhost}/api/get_project_with_id`, {
            method: "POST",
            body: JSON.stringify({
              id: task.project_id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((projectData) => {
              return { task, projectData };
            });
        })
      );
    })
    .then((taskProjectPairs) => {
      taskProjectPairs.forEach(({ task, projectData }) => {
        let current_date = `${task.due_date.slice(0, 10)}`;
        temp += `<tr id="${task.id}" class="border-bottom">`;
        temp += `<td>TAS-BL${task.id}</td>`;
        temp += `<td>${task.name}</td>`;
        temp += `<td style="padding-inline-end:15px">${task.description}</td>`;
        temp += `<td>${projectData[0].project_name}</td>`;
        if (task.priority == "HIGH") {
          temp += `<td><span class="badge badge-danger">HIGH</span></td>`;
        } else if (task.priority == "LOW") {
          temp += `<td><span class="badge badge-info">LOW</span></td>`;
        } else {
          temp += `<td><span class="badge badge-secondary">MEDIUM</span></td>`;
        }
        temp += `<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${task.percentage} %</td>`;
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
        if (task.status == "Pending") {
          temp += `<td>
                <div class="btn btn-success py-1 my-2" onclick="accept_task(event)">Accept</div>
            </td>`;
        } else {
          temp += `<td>
                    <div
                    class="btn btn-primary me-1 py-1 my-2"
                    onclick="update_task_visible(event)"
                    style="padding-inline:19px"
                    >
                    Update
                    </div>
                </td>`;
        }

        temp += `</tr>`;
      });

      // After building the table rows, update the DOM elements
      task_table.innerHTML = temp;
      total_task_count.innerHTML = total_task;
      pending_task_count.innerHTML = pending_task;
      progress_task_count.innerHTML = progress_task;
      completed_task_count.innerHTML = completed_task;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// UPDATE TASK STATUS
const update_task_status = (task_id, status, percentage = 0) => {
  fetch(`${localhost}/api/update_task_status`, {
    method: "PUT",
    body: JSON.stringify({
      id: task_id,
      status: status,
      percentage: percentage,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let content = {
        message: "New Project Added to the Database",
        title: "Task Updated",
        icon: "fas fa-tasks",
        url: "project.html",
        target: "_blank",
      };

      $.notify(content, {
        type: `success`,
        placement: {
          from: `top`,
          align: `center`,
        },
        time: 100,
        delay: 1000,
      });

      setTimeout(function () {
        window.location.href = "/member_task.html";
      }, 3000);
    });
};

// UPDATE TASK STATUS
const update_task_status_with_comment = (
  task_id,
  status,
  comment,
  percentage = 0
) => {
  fetch(`${localhost}/api/update_task_status_comment`, {
    method: "PUT",
    body: JSON.stringify({
      id: task_id,
      status: status,
      percentage: percentage,
      comment: comment_task.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let content = {
        message: "New Project Added to the Database",
        title: "Task Updated",
        icon: "fas fa-tasks",
        url: "project.html",
        target: "_blank",
      };

      $.notify(content, {
        type: `success`,
        placement: {
          from: `top`,
          align: `center`,
        },
        time: 100,
        delay: 1000,
      });

      setTimeout(function () {
        window.location.href = "/member_task.html";
      }, 3000);
    });
};

// UPDATE TASK
const update_task = () => {
  hide_view_mem_task.style.display = "none";
  hiding_over_task.style.display = "block";
  event.stopPropagation();
  update_task_status_with_comment(
    current_editing_task,
    myRange.value == 100 ? "Completed" : "Progress",
    comment_task.value,
    myRange.value
  );
};

// MARK TASK AS ACCEPTED BY MEMBER
const accept_task = (event) => {
  event.stopPropagation();
  document.getElementById(`hiding_over_task`).style.display = "block";
  let parent = event.target;

  while (parent.id == ``) parent = parent.parentNode;

  update_task_status(parent.id, "Progress");
};

// VISIBLE UPDATE FORM
const update_task_visible = (event) => {
  let parent = event.target;
  hide_view_mem_task.style.display = "block";

  while (parent.id == ``) parent = parent.parentNode;
  current_editing_task = parent.id;

  // Append Task Details
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
      myRange.value = data[0].percentage;
      sliderValue.innerHTML = `${data[0].percentage} %`;
      if (data[0].comments == "") {
        comment_task.placeholder = "Comments...";
      }
      output.innerHTML = myRange.value + "%";
      const value = data[0].percentage;
      slider.min = data[0].percentage;
      slider.style.background = `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${value}%, #ddd ${value}%, #ddd 100%)`;
      comment_task.innerHTML = data[0].comments;
    });
};

slider.addEventListener("input", function () {
  output.innerHTML = this.value + "%";
  updateSliderBackground();
});

function updateSliderBackground() {
  const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${value}%, #ddd ${value}%, #ddd 100%)`;
}

// Initial call to set the initial value display and background
output.innerHTML = slider.value + "%";
updateSliderBackground();

make_task_table_ready();
