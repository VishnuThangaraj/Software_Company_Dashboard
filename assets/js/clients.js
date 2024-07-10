const add_new_client = document.getElementById(`add_new_client`);
const clients_no_data = document.getElementById(`clients_no_data`);

// TOP COUNTERS
const client_total_count = document.getElementById(`client_total_count`);
const client_private_count = document.getElementById(`client_private_count`);
const client_public_count = document.getElementById(`client_public_count`);
const client_project_count = document.getElementById(`client_project_count`);

// ADD CLIENT FIELD
const new_client_name = document.getElementById(`new_client_name`);
const new_client_email = document.getElementById(`new_client_email`);
const new_client_mobile = document.getElementById(`new_client_mobile`);
const new_client_location = document.getElementById(`new_client_location`);
const new_client_url = document.getElementById(`new_client_url`);
const new_client_organization = [
  ...document.getElementsByClassName(`new_client_organization`),
];

// EDIT CLIENT FIELDS
const edit_client_name = document.getElementById(`edit_client_name`);
const edit_client_email = document.getElementById(`edit_client_email`);
const edit_client_mobile = document.getElementById(`edit_client_mobile`);
const edit_client_location = document.getElementById(`edit_client_location`);
const edit_client_url = document.getElementById(`edit_client_url`);
const edit_client_organization = [
  ...document.getElementsByClassName(`edit_client_organization`),
];

const edit_client_inner = document.getElementById(`edit_client_inner`);
const edit_client = document.getElementById(`edit_client`);
let current_edit_client = "";

const client_table = document.getElementById(`client_table`);
const client_quick_mail = document.getElementById(`client_quick_mail`);
const hiding_over_client = document.getElementById(`hiding_over_client`);
const client_details_table = document.getElementById(`client_details_table`);

// VIEW CLIENT DETAILS
const show_client_name = document.getElementById(`show_client_name`);
const hide_view_client = document.getElementById(`hide_view_client`);
const no_data_view_client = document.getElementById(`no_data_view_client`);

// QUICK MESSAGE
const company_mail_list = document.getElementById(`company_mail_list`);
const company_mail_subject = document.getElementById(`company_mail_subject`);
const company_mail_message = document.getElementById(`company_mail_message`);

// COMPOSE MAIL
const big_mail = document.getElementById(`big_mail`);
const big_mail_subject = document.getElementById(`big_mail_subject`);
const big_mail_message = document.getElementById(`big_mail_message`);
const client_quick_big_mail = document.getElementById(`client_quick_big_mail`);
const big_mail_list = document.getElementById(`big_mail_list`);

// SETUP CLIENT TABLE
const setup_client = async () => {
  let total_client_count = 0,
    private_client_count = 0,
    public_client_count = 0,
    project_client_count = 0;

  try {
    // Fetch Project Count
    const projectsResponse = await fetch(`${localhost}/api/get_projects`);
    const projectsJson = await projectsResponse.json();
    project_client_count = projectsJson.length;

    // Fetch Name and Email from Database
    const clientsResponse = await fetch(`${localhost}/api/get_clients`);
    const clientsJson = await clientsResponse.json();

    let temp = ` <tr class="border-bottom client_display">
          <th style="width: 8%">ID</th>
          <th style="width: 12%">Name</th>
          <th style="width: 6%">Email</th>
          <th style="width: 5%">Projects</th>
          <th style="width: 7%">Sector</th>
          <th style="width: 9%">Location</th>
          <th style="width: 11%">Action</th>
        </tr>`;

    if (clientsJson.length > 0) {
      total_client_count = clientsJson.length;

      // Loop through clients and dynamically build table rows
      for (let i = 0; i < clientsJson.length; i++) {
        const client = clientsJson[i];

        // QUICK MESSAGE
        let new_option = document.createElement("option");
        new_option.text = client.name;
        new_option.value = client.email;
        company_mail_list.append(new_option);

        // BIG MAIL
        let new_option1 = document.createElement("option");
        new_option1.text = client.name;
        new_option1.value = client.email;
        big_mail_list.append(new_option1);

        // Fetch Projects with Client ID
        const projectsResponse = await fetch(
          `${localhost}/api/get_project_with_client_id`,
          {
            method: "POST",
            body: JSON.stringify({
              id: client.id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );

        const projects = await projectsResponse.json();

        // Update counts based on client organization type
        if (client.organization === "PRIVATE") {
          private_client_count++;
        } else {
          public_client_count++;
        }

        // Build HTML for each client row
        temp += `<tr id="${
          client.id
        }" class="border-bottom" onclick="view_client_details(event)">
                  <td>CLNT-BL${client.id}</td>
                  <td>${client.name}</td>
                  <td>${client.email}</td>
                  <td>&nbsp;&nbsp;&nbsp;${projects.length}</td>
                  <td><span class="badge ${
                    client.organization === "PRIVATE"
                      ? "badge-primary"
                      : "badge-success"
                  }">${client.organization}</span></td>
                  <td>${client.location}</td>
                  <td>
                    <div class="btn btn-secondary py-1 my-2 me-1 px-3" onclick="make_edit_pannel_visible(event)">
                      <i class="far fa-edit"></i>
                    </div>
                    <div class="btn btn-danger  py-1 my-2 px-3" onclick="delete_client(event)">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </td>
                </tr>`;
      }

      // Update counts and display
      client_total_count.innerHTML = total_client_count;
      client_private_count.innerHTML = private_client_count;
      client_public_count.innerHTML = public_client_count;
      client_project_count.innerHTML = project_client_count;
      client_table.innerHTML = temp;
    } else {
      // If no clients available
      let new_option = document.createElement("option");
      new_option.text = "No Clients Available";
      new_option.value = "vishnuthangaraj.original@gmail.com";
      company_mail_list.append(new_option);

      // No data for client
      client_table.innerHTML = temp;
      clients_no_data.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors if necessary
  }
};

// SEND SMALL MAIL
const send_mail = (event) => {
  const subject = company_mail_subject.value.trim();
  const message = company_mail_message.value.trim();

  if (subject === "") {
    unsent_mail_notifications(
      `Unable to send mail without Subject`,
      `No Subject Provided`,
      `fas fa-exclamation-circle`
    );
    company_mail_subject.style.border = `1px solid #f58389`;
    if (message === "") company_mail_message.style.border = `1px solid #f58389`;
    return;
  }

  if (message === "") {
    unsent_mail_notifications(
      `Mail Cannot Be Sent : Empty Message`,
      `No Message Provided`,
      `fas fa-exclamation-circle`
    );
    company_mail_message.style.border = `1px solid #f58389`;
    return;
  }

  hiding_over_client.style.display = "block";
  client_quick_mail.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

  let to_company = "";

  Array.from(company_mail_list.children).forEach((element) => {
    if (element.value === company_mail_list.value) {
      to_company = element.innerHTML;
    }
  });

  fetch(`${localhost}/api/company_mail`, {
    method: "POST",
    body: JSON.stringify({
      to: to_company.value,
      subject: subject,
      message: message,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.success) {
        mail_notifications(
          `Mail sent to ${to_company}`,
          "Mail Sent",
          "fas fa-envelope",
          "success",
          client_quick_mail
        );
      } else {
        mail_notifications(
          `Unable to send Mail to ${to_company}`,
          "Sent Failed",
          "fas fa-envelope",
          "warning",
          client_quick_mail
        );
      }

      // Clear input fields after sending mail
      company_mail_subject.value = "";
      company_mail_message.value = "";

      setTimeout(() => {
        hiding_over_client.style.display = "none";
        client_quick_mail.innerHTML = `<i class="fab fa-telegram-plane"></i> SEND`;
        window.location.href = "/clients.html";
      }, 2000);
    })
    .catch((error) => {
      console.error("Error sending mail:", error);
      // Handle error scenarios if necessary
    });
};

// ADD NEW CLIENT
const add_client_bar = () => {
  add_new_client.style.display = "block";
};

// GET CONFIRMATION FOR DELETION
const get_delete_confirmation = () => {
  return new Promise((resolve) => {
    // Get the confirmation and cancel buttons
    const confirmationButton = document.getElementById("delete_confirmation");
    const cancelButton = document.getElementById("cancel_client_delete");

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

// DELETE CLIENT
const delete_client = async (event) => {
  event.stopPropagation();
  document.getElementById(`delete_overlay`).style.display = "block";

  let confirmation = await get_delete_confirmation();
  document.getElementById(`delete_overlay`).style.display = "none"; // Hide SweetAlert

  if (!confirmation) {
    return;
  }

  hiding_over_client.style.display = "block";
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  fetch(`${localhost}/api/delete_client`, {
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
        url: "clients.html",
        target: "_blank",
      };
      let alert_type = "";
      if (json.success) {
        content.message = "Existing Client Deleted from the Database";
        content.title = "Client Deleted";
        content.icon = "icon-user";
        alert_type = "danger";
      } else {
        content.message = "Unable to Delete Client With Projects";
        content.title = "Failed to Delete Client";
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
        window.location.href = "/clients.html";
      }, 3000);
    });
};

// HIDE ADD NEW CLIENT
const hide_new_client_form = () => {
  add_new_client.style.display = "none";
};

// ADD NEW CLIENT TO DATABASE
const save_new_client = () => {
  const formElements = [
    new_client_name,
    new_client_email,
    new_client_mobile,
    new_client_location,
    new_client_url,
  ];

  let validator = false;

  formElements.forEach((element) => {
    if (
      element.value === "" ||
      (element === new_client_url && element.value === "https://")
    ) {
      element.style.border = "1px solid #f58389";
      validator = true;
    } else {
      element.style.border = "1px solid #6ddc70";
    }
  });

  if (validator) {
    // Notification
    let content = {
      message: "Please fill out all fields correctly to add a new client.",
      title: "Incomplete Client Information",
      icon: "icon-user",
      url: "clients.html",
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

  hiding_over_client.style.display = "block";
  hide_new_client_form();

  let new_client_organization_checked = `Private`;

  new_client_organization.forEach((obj) => {
    if (obj.checked) new_client_organization_checked = obj.value;
  });

  fetch(`${localhost}/api/add_client`, {
    method: "POST",
    body: JSON.stringify({
      name: new_client_name.value,
      email: `${new_client_email.value}@gmail.com`,
      mobile: new_client_mobile.value,
      location: new_client_location.value,
      website: new_client_url.value,
      organization: new_client_organization_checked,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {
        message: "New Client Added to the Database",
        title: "Client Added",
        icon: "icon-user",
        url: "clients.html",
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
        window.location.href = "/clients.html";
      }, 3000);
    });
};

// MAKE CLIENT EDIT PANNEL VISIBLE
const make_edit_pannel_visible = (event) => {
  make_edit_input_green();
  event.stopPropagation();

  let parent = event.target.parentNode;
  while (parent.id == "") parent = parent.parentNode;
  current_edit_client = parent.id;
  edit_client.style.display = "block";

  // fetch data of the client and display
  fetch(`${localhost}/api/get_client_with_id`, {
    method: "POST",
    body: JSON.stringify({
      id: parent.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let company_details = json[0];

      // add data to input field
      edit_client_name.value = company_details.name;
      edit_client_email.value = `${company_details.email}`.slice(
        0,
        `${company_details.email}`.indexOf("@")
      );
      edit_client_mobile.value = company_details.mobile;
      edit_client_location.value = company_details.location;
      edit_client_url.value = company_details.website;
    });
};

// HIDE EDIT FORM
const hide_edit_client_form = () => {
  edit_client.style.display = "none";
};

// UPDATE EDITED CLIENT DETAILS
const save_edit_client = () => {
  const formElements = [
    edit_client_name,
    edit_client_email,
    edit_client_mobile,
    edit_client_location,
    edit_client_url,
  ];

  let validator = false;

  formElements.forEach((element) => {
    if (
      element.value === "" ||
      (element === edit_client_url && element.value === "https://")
    ) {
      element.style.border = "1px solid #f58389";
      validator = true;
    } else {
      element.style.border = "1px solid #6ddc70";
    }
  });

  if (validator) {
    // Notification
    let content = {
      message: "Please fill out all fields correctly to Edit client.",
      title: "Incomplete Client Information",
      icon: "icon-user",
      url: "clients.html",
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

  hide_edit_client_form();
  hiding_over_client.style.display = "block";

  // GET ALL EDITED DETAILS
  let edit_client_organization_checked = `Private`;

  edit_client_organization.forEach((obj) => {
    if (obj.checked) edit_client_organization_checked = obj.value;
  });

  fetch(`${localhost}/api/update_client_with_id`, {
    method: "PUT",
    body: JSON.stringify({
      id: current_edit_client,
      name: edit_client_name.value,
      email: `${edit_client_email.value}@gmail.com`,
      mobile: edit_client_mobile.value,
      location: edit_client_location.value,
      website: edit_client_url.value,
      organization: edit_client_organization_checked,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {
        message: "Updated client details have been successfully recorded.",
        title: "Client Details Updated",
        icon: "fas fa-pencil-alt",
        url: "clients.html",
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
        window.location.href = "/clients.html";
      }, 3000);
    });
};

// DISPLAY CLIENT DETAILS
const view_client_details = (event) => {
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  hide_view_client.style.display = "block";
  no_data_view_client.innerHTML = "";

  // Fetch Client With ID
  fetch(`${localhost}/api/get_client_with_id`, {
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
      show_client_name.innerHTML = data[0].name;
    });

  // Fetch Projects with Client ID
  fetch(`${localhost}/api/get_project_with_client_id`, {
    method: "POST",
    body: JSON.stringify({
      id: parent.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((projects) => {
      let temp = `<tr class="border-bottom">
                    <th style="width:15%;">Project ID</th>
                    <th style="width:15%;">Name</th>
                    <th style="width:20%;">Project Lead</th>
                    <th style="width:10%;">Members</th>
                    <th style="width:10%;">Tasks</th>
                    <th style="width: 5%;">View</th>
                  </tr>`;

      if (projects.length > 0) {
        let fetchTasksPromises = [];

        projects.forEach((project) => {
          let task_count = 0;
          let member_count = 0;

          // Fetch Members of the Task
          let fetchPromise = fetch(`${localhost}/api/task_with_projectid`, {
            method: "POST",
            body: JSON.stringify({
              id: project.id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((tasks) => {
              task_count = tasks.length;
              tasks.forEach((task) => {
                if (task.employee_id != null) member_count++;
              });

              // Update the row in the table after fetching tasks
              temp += `<tr id="${project.id}">`;
              temp += `<td>PROJ-BL${project.id}</td>`;
              temp += `<td>${project.project_name}</td>`;
              temp += `<td>Vishnu Thangaraj</td>`;
              temp += `<td>&nbsp;&nbsp;&nbsp;${member_count}</td>`;
              temp += `<td>&nbsp;&nbsp;&nbsp;${task_count}</td>`;
              temp += `<td><div onclick="project_section()" class="btn btn-info project_info_button my-2"><i class="fa fa-share"></i></div></td>`;
              temp += `</tr>`;

              // Update the table with the latest HTML
              client_details_table.innerHTML = temp;
            })
            .catch((error) => {
              console.error("Error fetching tasks:", error);
            });

          fetchTasksPromises.push(fetchPromise);
        });

        Promise.all(fetchTasksPromises)
          .then(() => {
            client_details_table.innerHTML = temp;
          })
          .catch((error) => {
            console.error("Error fetching tasks for all projects:", error);
          });
      } else {
        no_data_view_client.innerHTML = `<div class="fa-fade text-center no_projects my-4">NO PROJECTS AVAILABLE</div>`;
        client_details_table.innerHTML = temp;
      }
    });
};

// HIDE CLIENT DETAILS
const hide_client_details = () => {
  hide_view_client.style.display = "none";
};

// MAKE COMPOSE MAIL VISIBLE
const visible_compose_mail = () => {
  big_mail_subject.value =
    document.getElementById(`company_mail_subject`).value;
  big_mail_message.value =
    document.getElementById(`company_mail_message`).value;
  big_mail.style.display = "block";
};

// SEND COMPOSED LARGE MAIL
const send_big_mail = () => {
  if (big_mail_subject.value === "") {
    unsent_mail_notifications(
      `Unable to send mail without Subject`,
      `No Subject Provided`,
      `fas fa-exclamation-circle`
    );
    big_mail_subject.style.border = `1px solid #f58389`;
    if (big_mail_message.value === "")
      big_mail_message.style.border = `1px solid #f58389`;
    return;
  }

  if (big_mail_message.value === "") {
    unsent_mail_notifications(
      `Mail Cannot Be Sent : Empty Message`,
      `No Message Provided`,
      `fas fa-exclamation-circle`
    );
    big_mail_message.style.border = `1px solid #f58389`;
    return;
  }

  hiding_over_client.style.display = "block";
  client_quick_big_mail.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

  const to = big_mail_list;

  let to_company = "";

  to.childNodes.forEach((element) => {
    if (element.value == to.value) {
      to_company = element.innerHTML;
    }
  });

  fetch(`${localhost}/api/company_mail`, {
    method: "POST",
    body: JSON.stringify({
      to: to.value,
      subject: big_mail_subject.value,
      message: big_mail_message.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        mail_notifications(
          `Mail sent to ${to_company}`,
          "Mail Sent",
          "fas fa-envelope",
          "success",
          client_quick_big_mail
        );
      } else {
        mail_notifications(
          `Unable to send Mail to ${to_company}`,
          "Sent Failed",
          "fas fa-envelope",
          "warning",
          client_quick_big_mail
        );
      }
      setTimeout(function () {
        big_mail.style.display = "none";
        hiding_over_client.style.display = "none";
      }, 1000);
    });
};

// NOTIFICATION FOR MAIL
const mail_notifications = (to_company, title, icon, type, send_btn) => {
  let content = {
    message: to_company,
    title: title,
    icon: icon,
    url: "clients.html",
    target: "_blank",
  };

  $.notify(content, {
    type: type,
    placement: {
      from: `top`,
      align: `center`,
    },
    time: 100,
    delay: 1000,
  });

  // SENT MAIL
  send_btn.innerHTML = `<i class="fas fa-check"></i> DONE`;
};

// NOTIFICATION FOR UNSENT MAIL
const unsent_mail_notifications = (message, title, icon) => {
  let content = {
    message: message,
    title: title,
    icon: icon,
    url: "clients.html",
    target: "_blank",
  };

  $.notify(content, {
    type: "warning",
    placement: {
      from: `top`,
      align: `center`,
    },
    time: 100,
    delay: 1000,
  });
};

setup_client();
