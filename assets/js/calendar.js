let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // Current month (1-12)

// Function to generate calendar
async function generateCalendar(year, month) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const container = document.getElementById("calendar-body");
  const title = document.getElementById("calendar-title");
  const currentDate = new Date(year, month - 1); // month is 0-indexed

  // Clear previous calendar if exists
  container.innerHTML = "";
  title.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  // Calculate number of days in the month and the starting day
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = new Date(year, month - 1, 1).getDay(); // day of the week (0 - 6)

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
        console.log(`${formatDate_db(currentDateObj.toDateString())}`);
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
  const response = await fetch(`${localhost}/api/get_events_count`, {
    method: "POST",
    body: JSON.stringify({ date }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const json = await response.json();
  return json[0]; // Assuming API returns an array with a single object containing counts
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
