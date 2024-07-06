//////////// FORMAT THE DATE //////////
const formatDate = (inputDate) => {
  let [year, month, day] = inputDate.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month = months[parseInt(month, 10) - 1];

  return `${parseInt(day, 10)} ${month} ${year}`;
};

// HIDE CONTENT
const hide_content = (event) => {
  event.target.style.display = "none";
};

// PREVENT ACTION
const prevent_click = (event) => {
  event.stopPropagation();
};
