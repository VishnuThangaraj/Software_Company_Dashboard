// CREDENTIALS VALIDATION
let teamlead_id = 0,
  developer_id = 0;
const localhosts = `http://127.0.0.1:5501`;

const credential = sessionStorage.getItem("log_cred");
if (credential === undefined || credential === null) {
  window.location.href = "./login.html";
} else if (credential.startsWith("DEV-TL")) {
  teamlead_id = credential.slice(6);
  if (
    window.location.href == `${localhosts}/clients.html` ||
    window.location.href == `${localhosts}/task.html` ||
    window.location.href == `${localhosts}/employee.html`
  ) {
    window.location.href = "/teamlead.html";
  }
} else if (credential.startsWith("DEV-JD")) {
  developer_id = credential.slice(6);
} else if (!credential.startsWith("admin")) {
  window.location.href = "/login.html";
  if (
    window.location.href == `${localhosts}/teamlead.html` ||
    window.location.href == `${localhosts}/teamlead_task.html` ||
    window.location.href == `${localhosts}/teamlead_member.html`
  ) {
    window.location.href = "/clients.html";
  }
}

// FORMAT THE DATE
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

// TEAMLEAD FUNCTIONALITIES
// const teamlead_name = document.getElementById(`teamlead_name`);
// const teamlead_name2 = document.getElementById(`teamlead_name2`);
// const teamlead_email = document.getElementById(`teamlead_email`);
