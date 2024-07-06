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

const company_mail_list = document.getElementById(`company_mail_list`);
const client_table = document.getElementById(`client_table`);
const client_quick_mail = document.getElementById(`client_quick_mail`);
const hiding_over_client = document.getElementById(`hiding_over_client`);

// VIEW CLIENT DETAILS
const show_client_name = document.getElementById(`show_client_name`);
const hide_view_client = document.getElementById(`hide_view_client`);

/////////// SETUP MAIL SERVICE ///////////
const setup_client = () => {
  // Fetch Name and Email from Database
  fetch(`http://localhost:3005/api/get_clients`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.length > 0) {
        let temp = ` <tr class="border-bottom client_display">
            <th style="width: 7%">ID</th>
            <th style="width: 10%">Name</th>
            <th style="width: 8%">Email</th>
            <th style="width: 9%">Location</th>
            <th style="width: 5%">Projects</th>
            <!-- <th>Revenue</th> -->
            <th style="width: 11%">Action</th>
          </tr>`;

        json.forEach((client) => {
          // QUICK MESSAGE
          let new_option = document.createElement("option");
          new_option.text = client.name;
          new_option.value = client.email;
          company_mail_list.append(new_option);

          // MAIN DASHBOARD
          temp += `<tr id="${client.id}" class="border-bottom">`;
          temp += `<td>CLIENT-BL${client.id}</td>`;
          temp += `<td>${client.name}</td>`;
          temp += `<td>${client.email}</td>`;
          temp += `<td>${client.location}</td>`;
          temp += `<td>&nbsp;${client.projects}</td>`;
          temp += `<td>
                    <div class="btn btn-primary py-1 my-2 me-1 px-3" onclick="display_client_details(event)">
                      <i class="fas fa-eye"></i>
                    </div>
                    <div class="btn btn-secondary py-1 my-2 me-1 px-3" onclick="make_edit_pannel_visible(event)">
                      <i class="far fa-edit"></i>
                    </div>
                    <div class="btn btn-danger  py-1 my-2 px-3" onclick="delete_client(event)">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </td>`;
          temp += `</tr>`;
        });
        client_table.innerHTML = temp;
      } else {
        // EMPTY QUICK MESSAGE
        let new_option = document.createElement("option");
        new_option.text = "No Clients Available";
        new_option.value = "vishnuthangaraj.original@gmail.com";
        company_mail_list.append(new_option);
      }
    });
};

setup_client();

////////// SEND SMALL MAIL ///////////////
const send_mail = (event) => {
  hiding_over_client.style.display = "block";
  client_quick_mail.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
  const to = document.getElementById(`company_mail_list`),
    subject = document.getElementById(`company_mail_subject`),
    message = document.getElementById(`company_mail_message`);

  let to_company = "";

  to.childNodes.forEach((element) => {
    if (element.value == to.value) {
      to_company = element.innerHTML;
    }
  });

  fetch("http://localhost:3005/api/company_mail", {
    method: "POST",
    body: JSON.stringify({
      // to: "vishnuthangaraj.original@gmail.com",
      to: to.value,
      subject: subject.value,
      message: message.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let content = {};

      content.message = `Mail send to ${to_company}`;
      content.title = "Mail Send";
      content.icon = "fas fa-envelope";
      content.url = "index.html";
      content.target = "_blank";

      $.notify(content, {
        type: `success`,
        placement: {
          from: `top`,
          align: `center`,
        },
        time: 100,
        delay: 1000,
      });

      // SENT MAIL
      client_quick_mail.innerHTML = `<i class="fas fa-check"></i> DONE`;
      subject.value = "";
      message.value = "";

      setTimeout(function () {
        client_quick_mail.innerHTML = `<i class="fab fa-telegram-plane"></i> SEND`;
      }, 2000);
      hiding_over_client.style.display = "none";
    });
};

//////////// ADD NEW CLIENT ////////////
const add_client_bar = () => {
  document.getElementById(`add_new_client`).style.display = "block";
};

//////////// DELETE CLIENT ////////////
const delete_client = (event) => {
  hiding_over_client.style.display = "block";
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  fetch("http://localhost:3005/api/delete_client", {
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
      let content = {};
      let alert_type = "";
      if (json.success) {
        content.message = "Existing Client Deleted from the Database";
        content.title = "Client Deleted";
        content.icon = "icon-user";
        content.url = "index.html";
        content.target = "_blank";
        alert_type = "danger";
      } else {
        content.message = "Unable to Delete Client With Projects";
        content.title = "Failed to Delete Client";
        content.icon = "fas fa-exclamation-circle";
        content.url = "index.html";
        content.target = "_blank";
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
        window.location.href = "http://127.0.0.1:5500/index.html";
      }, 3000);
    });
};

///////// HIDE ADD NEW CLIENT ///////////
const hide_new_client_form = () => {
  document.getElementById(`add_new_client`).style.display = "none";
};

//////// ADD NEW CLIENT TO DATABASE //////
const save_new_client = () => {
  hide_new_client_form();

  let new_client_organization_checked = `Private`;

  new_client_organization.forEach((obj) => {
    if (obj.checked) new_client_organization_checked = obj.value;
  });

  fetch("http://localhost:3005/api/add_client", {
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
      let content = {};

      content.message = "New Client Added to the Database";
      content.title = "Client Added";
      content.icon = "icon-user";
      content.url = "index.html";
      content.target = "_blank";

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
        window.location.href = "http://127.0.0.1:5500/index.html";
      }, 3000);
    });
};

/////// MAKE CLIENT EDIT PANNEL VISIBLE /////////
const make_edit_pannel_visible = (event) => {
  let parent = event.target.parentNode;
  while (parent.id == "") parent = parent.parentNode;
  current_edit_client = parent.id;
  edit_client.style.display = "block";

  //// fetch data of the client and display
  fetch("http://localhost:3005/api/get_client_with_id", {
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

//////////// HIDE EDIT FORM /////////////
const hide_edit_client_form = () => {
  edit_client.style.display = "none";
};

/////////// UPDATE EDITED CLIENT DETAILS ///////////
const save_edit_client = () => {
  hide_edit_client_form();
  edit_client_inner.classList.add("my-slide-in");

  // GET ALL EDITED DETAILS
  let edit_client_organization_checked = `Private`;

  edit_client_organization.forEach((obj) => {
    if (obj.checked) edit_client_organization_checked = obj.value;
  });

  fetch("http://localhost:3005/api/update_client_with_id", {
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
      let content = {};

      content.message =
        "Updated client details have been successfully recorded.";
      content.title = "Client Updated";
      content.icon = "fas fa-pencil-alt";
      content.url = "index.html";
      content.target = "_blank";

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
        window.location.href = "http://127.0.0.1:5500/index.html";
      }, 3000);
    });
};

////////// DISPLAY CLIENT DETAILS ///////////////
const display_client_details = (event) => {
  let parent = event.target;
  while (parent.id == ``) parent = parent.parentNode;

  hide_view_client.style.display = "block";

  fetch("http://localhost:3005/api/get_client_with_id", {
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

  console.log(parent.id);
};
