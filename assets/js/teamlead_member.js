const employee_no_data = document.getElementById(`employee_no_data`);

// TOP COUNTERS
const total_employee = document.getElementById(`total_employee`);
const developer_employee = document.getElementById(`developer_employee`);
const bench_employee = document.getElementById(`bench_employee`);

// Add Section
const new_employee_name = document.getElementById(`new_employee_name`);
const new_employee_email = document.getElementById(`new_employee_email`);
const new_employee_mobile = document.getElementById(`new_employee_mobile`);
const new_employee_age = document.getElementById(`new_employee_age`);
const employee_gender_list = document.getElementById(`employee_gender_list`);
const new_employee_address = document.getElementById(`new_employee_address`);
const new_employee_designation = document.getElementById(
  `new_employee_designation`
);
const employee_position_list = document.getElementById(
  `employee_position_list`
);
const employee_teamlead_list = document.getElementById(
  `employee_teamlead_list`
);

// Edit Section
let current_edit_employee = 0,
  current_edit_position = "teamlead";
const edit_employee_name = document.getElementById(`edit_employee_name`);
const edit_employee_email = document.getElementById(`edit_employee_email`);
const edit_employee_mobile = document.getElementById(`edit_employee_mobile`);
const edit_employee_age = document.getElementById(`edit_employee_age`);
const edit_employee_gender_list = document.getElementById(
  `edit_employee_gender_list`
);
const edit_employee_address = document.getElementById(`edit_employee_address`);
const edit_employee_designation = document.getElementById(
  `edit_employee_designation`
);
const edit_employee_position_list = document.getElementById(
  `edit_employee_position_list`
);
const edit_employee_teamlead_list = document.getElementById(
  `edit_employee_teamlead_list`
);

const add_new_employee = document.getElementById(`add_new_employee`);
const edit_employee = document.getElementById(`edit_employee`);
const employee_table = document.getElementById(`employee_table`);

// MAKE EMPLOYEE PANNEL READY
const make_employee_table_ready = () => {
  let total_employee_count = 0,
    bench_employee_count = 0;

  /// FETCH TEAMLEAD
  let temp = `
  <tr>
      <th style="width: 4%;">ID</th>
      <th style="width: 6%;">Name</th>
      <th style="width: 2%;">Email</th>
      <th style="width: 2%;">Phone</th>
      <th style="width: 2%;">Age</th>
      <th style="width: 3%;">Gender</th>
      <th style="width: 2%;">Position</th>
      <th style="width: 5%;">Designation</th>
      <th style="width: 5%;">Action</th>
    </tr>
  `;

  // Fetch Employee
  fetch(`${localhost}/api/get_employee_tl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: teamlead_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      total_employee_count += data.length;
      if (data.length > 0) {
        data.forEach((employee) => {
          temp += `<tr id="${employee.id}" onclick="task_visible()">`;
          temp += `<td>DEV-JD${employee.id}</td>`;
          temp += `<td>${employee.name}</td>`;
          temp += `<td>${employee.email}</td>`;
          temp += `<td>${employee.phone}</td>`;
          temp += `<td>${employee.age}</td>`;
          temp += `<td>${employee.gender.toUpperCase()}</td>`;
          temp += `<td class="highlight_teamlead"><span class="badge badge-primary">DEVELOPER</span></td>`;
          temp += `<td style="font-weight:600">${employee.designation}</td>`;

          temp += `<td>
                    <div class="btn btn-secondary py-1 my-2 me-1 px-3" onclick="make_edit_employee_visible(event, 'employee')">
                      <i class="far fa-edit"></i>
                    </div>
                    <div class="btn btn-danger  py-1 my-2 px-3" onclick="delete_employee(event, 'employee')">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </td>`;
          temp += `</tr>`;
          employee_table.innerHTML = temp;
          total_employee.innerHTML = total_employee_count;
          developer_employee.innerHTML = data.length;
          if (total_employee_count == 0) {
            employee_no_data.style.display = "block";
          }
        });
      }
    });

  fetch(`${localhost}/api/get_bench_employee_count_tl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: teamlead_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      bench_employee.innerHTML = data[0].bench;
    });

  employee_table.innerHTML = temp;
};

// MAKE ADD EMPLOYEE FORM VISIBLE
const make_add_employee_visible = () => {
  add_new_employee.style.display = "block";
};

// HIDE EMPLOYEE FORM
const make_add_employee_hidden = () => {
  add_new_employee.style.display = "none";
};

// SAVE NEW EMPLOYEE
const save_new_employee = () => {
  // Form Validation
  let fields = [
    new_employee_name,
    new_employee_email,
    new_employee_mobile,
    new_employee_age,
    employee_gender_list,
    new_employee_address,
    new_employee_designation,
  ];

  let validator = false;

  fields.forEach((field) => {
    if (field.value === "") {
      field.style.border = "1px solid #f58389";
      validator = true;
    } else {
      field.style.border = "1px solid #6ddc70";
    }
  });

  if (validator) {
    // Notification
    let content = {
      message: "Please fill out all fields to add New Employee.",
      title: "Incomplete Employee Details",
      icon: "icon-user",
      url: "teamlead_member.html",
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

  add_new_employee.style.display = "none";
  hiding_over_employee.style.display = "block";

  // Add Employee To Database
  fetch(`${localhost}/api/add_employee`, {
    method: "POST",
    body: JSON.stringify({
      name: new_employee_name.value,
      email: `${new_employee_email.value}@gmail.com`,
      phone: new_employee_mobile.value,
      age: new_employee_age.value,
      gender: employee_gender_list.value,
      address: new_employee_address.value,
      designation: new_employee_designation.value,
      team_lead_id: teamlead_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {
        message: "New Employee Added to the Database",
        title: "Employee Added",
        icon: "icon-user",
        url: "teamlead_member.html",
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
    });

  setTimeout(function () {
    window.location.href = "/teamlead_member.html";
  }, 3000);
};

// VIEW MEMBERS
const member_visible = () => {
  console.log("Vidhnu");
};

// VIEW TASK
const task_visible = () => {
  console.log("task");
};

// MAKE EDIT EMPLOYEE VISIBLE
const make_edit_employee_visible = (event, position) => {
  event.stopPropagation();

  edit_employee.style.display = "block";
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  current_edit_employee = parent.id;
  current_edit_position = position;

  // Fetch Employee Data
  fetch(`${localhost}/api/get_${current_edit_position}_with_id`, {
    method: "POST",
    body: JSON.stringify({
      id: current_edit_employee,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      edit_employee_name.value = json[0].name;
      edit_employee_email.value = json[0].email;
      edit_employee_mobile.value = json[0].phone;
      edit_employee_age.value = json[0].age;
      edit_employee_gender_list.value = json[0].gender;
      edit_employee_address.value = json[0].address;
      edit_employee_designation.value = json[0].designation;
    });
};

// GET CONFIRMATION FOR DELETION
const get_delete_confirmation = () => {
  return new Promise((resolve) => {
    // Get the confirmation and cancel buttons
    const confirmationButton = document.getElementById(
      "confirm_employee_delete"
    );
    const cancelButton = document.getElementById("cancel_employee_delete");

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

// DELETE EMPLOYEE
const delete_employee = async (event, position) => {
  event.stopPropagation();
  delete_overlay_employee.style.display = "block";

  let confirmation = await get_delete_confirmation();
  delete_overlay_employee.style.display = "none"; // Hide SweetAlert

  if (!confirmation) {
    return;
  }

  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  fetch(`${localhost}/api/delete_${position}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: parent.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {
        url: "teamlead_member.html",
        target: "_blank",
      };
      let alert_type = "";
      if (json.success) {
        content.message =
          "The current Employee has been expunged from the database.";
        content.title = "The Employee has been removed";
        content.icon = "icon-user";
        alert_type = "danger";
      } else {
        content.message =
          "Unable to remove Employee due to active projects or members.";
        content.title = "Failed to remove Employee";
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
        window.location.href = "/teamlead_member.html";
      }, 3000);
    });
};

// HIDE EDIT EMPLOYEE
const hide_edit_employee = () => {
  edit_employee.style.display = "none";
};

// UPDATE EMPLOYEE
const save_edited_employee = () => {
  edit_employee.style.display = "none";
  hiding_over_employee.style.display = "block";

  fetch(`${localhost}/api/update_employee_with_id`, {
    method: "PUT",
    body: JSON.stringify({
      id: current_edit_employee,
      name: edit_employee_name.value,
      email: edit_employee_email.value,
      phone: edit_employee_mobile.value,
      age: edit_employee_age.value,
      gender: edit_employee_gender_list.value,
      address: edit_employee_address.value,
      designation: edit_employee_designation.value,
      team_lead_id: teamlead_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {
        url: "teamlead_member.html",
        target: "_blank",
      };
      let alert_type = "";
      if (json.success) {
        content.message = "Employee Details have been Updated.";
        content.title = "Employee Updated";
        content.icon = "icon-user";
        alert_type = "success";
      } else {
        content.message =
          "Unable to Update Employee due to active projects or members.";
        content.title = "Failed to Update Employee";
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
    });

  setTimeout(function () {
    window.location.href = "/teamlead_member.html";
  }, 3000);
};

make_employee_table_ready();
