let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
const hiding_over_calendar = document.getElementById(`hiding_over_calendar`);

// TOP COUNTERS
const total_calendar = document.getElementById(`total_calendar`);
const events_calendar = document.getElementById(`events_calendar`);
const project_calendar = document.getElementById(`project_calendar`);
const task_calendar = document.getElementById(`task_calendar`);

// ADD EVENT
const event_name = document.getElementById(`event_name`);
const event_description = document.getElementById(`event_description`);
const event_date = document.getElementById(`event_date`);
const event_access = document.getElementById(`event_access`);

// VIEW EVENTS
const date_here = document.getElementById(`date_here`);
const hide_view_calendar = document.getElementById(`hide_view_calendar`);
const event_details_table = document.getElementById(`event_details_table`);
const no_data_view_event = document.getElementById(`no_data_view_event`);

// UPDATE TOP DISPLAY COUNTERS
const update_counters = (month, year) => {
  fetch(`${localhost}/api/get_event_month_tl`, {
    method: "POST",
    body: JSON.stringify({
      month: month,
      year: year,
      teamlead: teamlead_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      total_calendar.innerHTML =
        json[0].event_count +
        json[0].project_due_count +
        json[0].task_due_count;
      events_calendar.innerHTML = json[0].event_count;
      project_calendar.innerHTML = json[0].project_due_count;
      task_calendar.innerHTML = json[0].task_due_count;
    });
};

// Function to generate calendar
async function generateCalendar(year, month) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const container = document.getElementById("calendar-body");
  const title = document.getElementById("calendar-title");
  const currentDate = new Date(year, month - 1);

  // Clear previous calendar if exists
  update_counters;
  container.innerHTML = "";
  title.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  // Calculate number of days in the month and the starting day
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = new Date(year, month - 1, 1).getDay(); // day of the week (0 - 6)
  update_counters(month, year);

  // Loop through each day in the calendar month
  for (let i = 0; i < 6 * 7; i++) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-cell");

    if (i >= startDay && i - startDay < daysInMonth) {
      const date = i - startDay + 1;
      cell.innerHTML += `<div class="current_date">${date}</div>`;
      const currentDateObj = new Date(year, month - 1, date);
      const currentDateString = `${year}-${month}-${date}`;

      // Fetch event counts asynchronously
      await fetchEventsCount(currentDateString)
        .then((counts) => {
          if (counts == undefined) return;

          if (counts.event_count > 0) {
            const eventsHolder = `<div class="events_holder badge badge-primary"> Events ${counts.event_count} </div> </br>`;
            cell.innerHTML += eventsHolder;
          }
          if (counts.task_count > 0) {
            const taskDue = `<div class="mt-1 task_due badge badge-secondary"> Tasks ${counts.task_count} </div></br>`;
            cell.innerHTML += taskDue;
          }
          if (counts.project_count > 0) {
            const projectDue = `<div class="mt-1 project_due badge badge-warning"> Project Due ${counts.project_count} </div></br>`;
            cell.innerHTML += projectDue;
          }
        })
        .catch((error) => {
          console.error(
            `Error fetching events count for ${currentDateString}: ${error}`
          );
          cell.innerHTML = "<div class='error'>Error fetching data</div>";
        });

      // Add click event listener for the cell
      cell.addEventListener("click", () => {
        no_data_view_event.style.display = "none";
        date_here.innerHTML = currentDateObj.toDateString();
        hide_view_calendar.style.display = "block";

        // TABLE
        let temp = `<tr>
                    <th style="width: 15%;">Name</th>
                    <th style="width: 20%">Description</th>
                    <th style="width: 5%;">Type</th>
                    <th style="width: 5%;">Access</th>
                    <th style="width: 5%;">Action</th>
                  </tr>`;

        fetch(`${localhost}/api/get_events_tl`, {
          method: "POST",
          body: JSON.stringify({
            date: formatDate_db(currentDateObj.toDateString()),
            teamlead: teamlead_id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.length > 0) {
              json.forEach((data) => {
                temp += `<tr id="${data.id}" class="border-bottom">
                          <td>${data.name}</td>`;
                temp += `<td>${data.description}</td>`;
                if (data.type === "event") {
                  temp += `<td><span class="badge badge-primary">EVENT</span></td>`;
                } else if (data.type === `project`) {
                  temp += `<td><span class="badge badge-warning">PROJECT</span></td>`;
                } else {
                  temp += `<td><span class="badge badge-secondary">TASK</span></td>`;
                }
                temp += `<td>${data.event_access
                  .slice(0, 1)
                  .toUpperCase()}${data.event_access.slice(1)}</td>`;
                if (data.type === "event") {
                  temp += `<td><div id="del_btn" onclick="event_delete(event)" class=" btn btn-danger py-1 px-3 my-2" ><i class="icon-trash"></i></div></td>
                    </tr>`;
                } else if (data.type === `project`) {
                  temp += `<td><div onclick="visit_project()" class="btn btn-success py-1 my-2 px-3 me-2"><i class="icon-action-redo"></i></div></td>
                    </tr>`;
                } else {
                  temp += `<td><div onclick="visit_task()" class="btn btn-success py-1 my-2 px-3 me-2"><i class="icon-action-redo"></i></div></td>
                    </tr>`;
                }
              });
            } else {
              no_data_view_event.style.display = "block";
            }
            event_details_table.innerHTML = temp;
            console.log(json);
          });
      });

      // Add hover effects
      cell.addEventListener("mouseover", () => {
        cell.classList.add("hovered");
      });
      cell.addEventListener("mouseout", () => {
        cell.classList.remove("hovered");
      });
    }

    container.appendChild(cell);
  }
}

// Function to fetch event counts for a specific date
async function fetchEventsCount(date) {
  const response = await fetch(`${localhost}/api/get_events_count_tl`, {
    method: "POST",
    body: JSON.stringify({ date, teamlead: teamlead_id }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const json = await response.json();
  return json[0];
}

// Initialize calendar for current year and month
generateCalendar(currentYear, currentMonth);

// Button event listeners for next and previous month
document.getElementById("prevMonthBtn").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

document.getElementById("nextMonthBtn").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});

// Function to show calendar for custom month and year
function showCustomMonth() {
  const inputMonth = parseInt(document.getElementById("inputMonth").value);
  const inputYear = parseInt(document.getElementById("inputYear").value);

  if (
    isNaN(inputMonth) ||
    isNaN(inputYear) ||
    inputMonth < 1 ||
    inputMonth > 12
  ) {
    alert("Please enter a valid month (1-12) and year.");
    return;
  }

  currentMonth = inputMonth;
  currentYear = inputYear;
  generateCalendar(currentYear, currentMonth);
}

// MAKE ADD EVENT FORM VISIBLE
function toggleForm() {
  var eventForm = document.getElementById("eventForm");
  eventForm.classList.toggle("active");
  document.getElementById(`eventForm2`).style.display = "block";

  const fields = [event_name, event_description, event_date, event_access];

  fields.forEach((field) => {
    if (field.tagName.toLowerCase() !== "select") {
      field.value = "";
    } else {
      field.value = "public";
    }

    field.style.border = "1px solid #eff1f5";
  });
}

const hide_contents = (event) => {
  event.target.style.display = "none";
  var eventForm = document.getElementById("eventForm");
  eventForm.classList.toggle("active");
};

// CLOSE VIEW EVENT BOX
const close_view_event = () => {
  hide_view_calendar.style.display = "none";
};

// VISIT PROJECT PAGE
const visit_project = () => {
  window.location.href = `/teamlead_project.html`;
};

// VISIT TASK PAGE
const visit_task = () => {
  window.location.href = `/teamlead_task.html`;
};

// DELETE EVENT
const event_delete = (event) => {
  // Notification
  let content = {
    message: "Access Denied to Remove Event from Calendar",
    title: "Access Denied",
    icon: "fas fa-calendar-times",
    url: "teamlead_calendar.html",
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
};

// EDIT EVENT
const edit_event = (event) => {
  alert("Build on Progress 💻 ! @Source Git: Vishnu Thangaraj");
};
