// CREDENTIALS VALIDATION
// const credential = sessionStorage.getItem("log_cred");
// if (credential !== `admin`) {
//   window.location.href = "./login.html";
// }

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

const teamlead_id = 3;

make_edit_input_green();

// TEAMLEAD FUNCTIONALITIES
// const teamlead_name = document.getElementById(`teamlead_name`);
// const teamlead_name2 = document.getElementById(`teamlead_name2`);
// const teamlead_email = document.getElementById(`teamlead_email`);
