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
const edit_employee_name = document.getElementById(`edit_employee_name`);
const edit_employee_email = document.getElementById(`edit_employee_email`);
const edit_employee_mobile = document.getElementById(`edit_employee_mobile`);
const edit_employee_age = document.getElementById(`edit_employee_age`);
const edit_employee_gender_list =
  document.getElementById(`employee_gender_list`);
const edit_employee_address = document.getElementById(`edit_employee_address`);
const edit_employee_designation = document.getElementById(
  `edit_employee_designation`
);
const edit_employee_position_list = document.getElementById(
  `employee_position_list`
);
const edit_employee_teamlead_list = document.getElementById(
  `employee_teamlead_list`
);

const add_new_employee = document.getElementById(`add_new_employee`);
const edit_employee = document.getElementById(`edit_employee`);
const employee_table = document.getElementById(`employee_table`);

///////////////// MAKE EMPLOYEE PANNEL READY //////////
const make_employee_table_ready = () => {
  /// FETCH TEAMLEAD
  let temp = `
  <tr>
      <th style="width: 4%;">ID</th>
      <th style="width: 6%;">Name</th>
      <th style="width: 2%;">Email</th>
      <th style="width: 2%;">Phone</th>
      <th style="width: 2%;">Age</th>
      <th style="width: 3%;">Gender</th>
      <th style="width: 5%;">Position</th>
      <th style="width: 5%;">Team Lead</th>
      <th style="width: 5%;">Action</th>
    </tr>
  `;
  // Fetch TeamLead
  fetch(`http://localhost:3005/api/get_teamlead`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        data.forEach((employee) => {
          /////// DROP DOWN LIST /////
          let new_option = document.createElement("option");
          new_option.text = employee.name;
          new_option.value = employee.id;
          employee_teamlead_list.append(new_option);

          temp += `<tr id="${employee.id}" class="border-bottom" onclick="member_visible()">`;
          temp += `<td>DEV-TL${employee.id}</td>`;
          temp += `<td class="emp_name" >${employee.name}</td>`;
          temp += `<td>${employee.email}</td>`;
          temp += `<td>${employee.phone}</td>`;
          temp += `<td>${employee.age}</td>`;
          temp += `<td>${employee.gender}</td>`;
          temp += `<td class="highlight_teamlead"><span class="badge badge-success">TEAM LEAD</span></td>`;
          temp += `<td>---</td>`;

          temp += `<td>
                    <div class="btn btn-secondary py-1 my-2 me-1 px-3" onclick="edit_employee_data(event)">
                      <i class="far fa-edit"></i>
                    </div>
                    <div class="btn btn-danger  py-1 my-2 px-3" onclick="delete_teamlead(event)">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </td>`;
          temp += `</tr>`;
          employee_table.innerHTML = temp;
        });
      }
    });
  // Fetch Employee
  fetch(`http://localhost:3005/api/get_employee`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        data.forEach((employee) => {
          temp += `<tr id="${employee.id}" onclick="task_visible()">`;
          temp += `<td>DEV-JD${employee.id}</td>`;
          temp += `<td>${employee.name}</td>`;
          temp += `<td>${employee.email}</td>`;
          temp += `<td>${employee.phone}</td>`;
          temp += `<td>${employee.age}</td>`;
          temp += `<td>${employee.gender}</td>`;
          temp += `<td style="font-weight:600">Developer</td>`;
          temp += `<td style="font-weight:600">DEV-TL${employee.team_lead_id}</td>`;

          temp += `<td>
                    <div class="btn btn-secondary py-1 my-2 me-1 px-3" onclick="edit_employee_data(event)">
                      <i class="far fa-edit"></i>
                    </div>
                    <div class="btn btn-danger  py-1 my-2 px-3" onclick="delete_developer(event)">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </td>`;
          temp += `</tr>`;
          employee_table.innerHTML = temp;
        });
      }
    });
};

make_employee_table_ready();

////////// MAKE ADD EMPLOYEE FORM VISIBLE //////////
const make_add_employee_visible = () => {
  add_new_employee.style.display = "block";
};

////////// HIDE EMPLOYEE FORM //////////
const make_add_employee_hidden = () => {
  add_new_employee.style.display = "none";
};

///////// SAVE NEW EMPLOYEE //////////
const save_new_employee = () => {
  console.log(`
    ${new_employee_name.value}
    ${new_employee_email.value}
    ${new_employee_mobile.value}
    ${new_employee_age.value}
    ${employee_gender_list.value}
    ${new_employee_address.value}
    ${new_employee_designation.value}
    ${employee_position_list.value}
    ${employee_teamlead_list}
    `);
};

//////////// DISPLAY TEAM LEAD LIST /////////////
const open_team_lead_list = () => {
  employee_teamlead_list.disabled = false;
  console.log(employee_position_list.value);
  if (employee_position_list.value == "Team Lead") {
    employee_teamlead_list.removeChild(employee_teamlead_list.firstChild);
  }
};

///////// VIEW MEMBERS ////////////
const member_visible = () => {
  console.log("Vidhnu");
};

///////// VIEW TASK  ////////////
const task_visible = () => {
  console.log("task");
};

//////// MAKE EDIT EMPLOYEE VISIBLE //////
const make_edit_employee_visible = () => {};

//////// DELETE TEAM LEAD /////////
const delete_teamlead = (event) => {
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  fetch("http://localhost:3005/api/delete_teamlead", {
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
        url: "employee.html",
        target: "_blank",
      };
      let alert_type = "";
      if (json.success) {
        content.message =
          "The current Team Lead has been expunged from the database.";
        content.title = "The Team Lead has been removed";
        content.icon = "icon-user";
        alert_type = "danger";
      } else {
        content.message =
          "Unable to remove Team Lead due to active projects and members.";
        content.title = "Failed to remove Team Lead";
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
        hiding_over_client.style.display = "none";
        window.location.href = "http://127.0.0.1:5500/employee.html";
      }, 3000);
    });
};

//////// DELETE DEVELOPER /////////
const delete_developer = (event) => {
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  console.log(parent.id);
};

//////// VISIBLE-EDIT EMPLOYEE ////////
const edit_employee_data = () => {
  edit_employee.style.display = "block";
};
