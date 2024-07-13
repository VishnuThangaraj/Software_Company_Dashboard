// CREDENTIALS VALIDATION
let teamlead_id = 0,
  developer_id = 0;
const localhosts = `http://127.0.0.1:5501`;

const credential = sessionStorage.getItem("log_cred");

// Function to check the credential and redirect
function checkCredential() {
  if (credential === null) {
    window.location.href = "/login.html";
  } else if (credential === "admin") {
    const allowedPages = [
      `clients.html`,
      `project.html`,
      `employee.html`,
      `task.html`,
      `calendar.html`,
      `message.html`,
    ];
    const currentPage = window.location.pathname.split("/").pop();
    if (!allowedPages.includes(currentPage)) {
      window.location.href = "login.html";
    }
  } else if (credential.startsWith("DEV-JD")) {
    developer_id = credential.slice(6);
    const allowedPages = [`member.html`, `member_task.html`];
    const currentPage = window.location.pathname.split("/").pop();
    if (!allowedPages.includes(currentPage)) {
      window.location.href = "login.html";
    }
  } else if (credential.startsWith("DEV-TL")) {
    teamlead_id = credential.slice(6);
    const allowedPages = [
      `teamlead_member.html`,
      `teamlead_task.html`,
      `teamlead.html`,
    ];
    const currentPage = window.location.pathname.split("/").pop();
    if (!allowedPages.includes(currentPage)) {
      window.location.href = "login.html";
    }
  } else {
    window.location.href = "login.html";
  }
}

checkCredential();

// FORMAT THE DATE (DD-MMM-YYYY)
const formatDate = (inputDate) => {
  let [year, month, day] = inputDate.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  month = months[parseInt(month, 10) - 1];

  return `${parseInt(day, 10) + 1} ${month} ${year}`;
};

// FORMAT THE DATE (YYYY-MM-DD)
const formatDate_db = (inputDateStr) => {
  // Parse input date string
  let date = new Date(inputDateStr);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

// HIDE CONTENT
const hide_content = (event) => {
  event.target.style.display = "none";
};

// PREVENT ACTION
const prevent_click = (event) => {
  event.stopPropagation();
};

// MOVE PAGE TO PROJECT SECTION
const project_section = () => {
  window.location.href = "/project.html";
};

// MOVE PAGE TO PROJECT SECTION
const message_section = () => {
  window.location.href = "/message.html";
};

// INPUT VALIDATION (GREEN)
Array.from(document.getElementsByClassName("form_input_level")).forEach(
  (element) => {
    element.addEventListener("input", (event) => {
      if (event.target.value !== "") {
        event.target.style.border = "1px solid #6ddc70";
      } else {
        event.target.style.border = "1px solid #eff1f5";
      }
    });
  }
);

// INPUT EDIT VALIDATION (GREEN)
const make_edit_input_green = () => {
  Array.from(document.getElementsByClassName("edit_form_input_level")).forEach(
    (element) => {
      element.style.border = "1px solid #6ddc70";
    }
  );
};

// LOGOUT FUNCTIONALITY
const logout_admin = () => {
  sessionStorage.removeItem("log_cred");
  window.location.href = "/login.html";
};

make_edit_input_green();
