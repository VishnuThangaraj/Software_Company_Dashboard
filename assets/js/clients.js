const new_client_name = document.getElementById(`new_client_name`);
const new_client_email = document.getElementById(`new_client_email`);
const new_client_mobile = document.getElementById(`new_client_mobile`);
const new_client_location = document.getElementById(`new_client_location`);
const new_client_url = document.getElementById(`new_client_url`);
const new_client_organization = [
  ...document.getElementsByClassName(`new_client_organization`),
];
const company_mail_list = document.getElementById(`company_mail_list`);
const client_table = document.getElementById(`client_table`);
const client_quick_mail = document.getElementById(`client_quick_mail`);
const hiding_over_client = document.getElementById(`hiding_over_client`);

/////////// SETUP MAIL SERVICE ///////////
const setup_client = () => {
  // Fetch Name and Email from Database
  fetch(`http://localhost:3005/api/get_clients`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.length > 0) {
        let temp = ` <tr class="border-bottom client_display">
            <th style="width: 13%">ID</th>
            <th style="width: 22%">Name</th>
            <th style="width: 24%">Email</th>
            <th style="width: 11%">Location</th>
            <th style="width: 10%">Projects</th>
            <!-- <th>Revenue</th> -->
            <th style="width: 19%">Action</th>
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
                    <div class="btn btn-primary py-1 my-2 me-1 px-3">
                      <i class="fas fa-eye"></i>
                    </div>
                    <div class="btn btn-secondary py-1 my-2 me-1 px-3">
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
  client_quick_mail.innerHTML = `'<i class="fas fa-spinner fa-spin"></i> Sending...`;
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

      content.message = "Existing Client Deleted from the Database";
      content.title = "Client Deleted";
      content.icon = "icon-user";
      content.url = "index.html";
      content.target = "_blank";

      $.notify(content, {
        type: `danger`,
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
