const add_new_project = document.getElementById(`add_new_project`);
const project_table = document.getElementById(`project_table`);

const new_project_clients = document.getElementById(`new_project_clients`);

/////// MAKE PROEJCTS READY ////////
const setup_project = async () => {
  // ADD COMPANY NAMES TO ADD NEW PROJECT //

  fetch(`http://localhost:3005/api/get_all_client_names_id`)
    .then((response) => response.json())
    .then((json) => {
      if (json.length > 0) {
        new_project_clients.innerHTML = "";
        json.forEach((company) => {
          let new_option = document.createElement("option");
          new_option.text = company.name;
          new_option.value = company.id;
          new_project_clients.append(new_option);
        });
      } else {
        let new_option = document.createElement("option");
        new_option.text = `No Clients Available`;
        new_option.value = `No Clients Available`;
        new_project_clients.append(new_option);
      }
    });

  // DISPLAY PROJECTS //
  try {
    const response = await fetch(`http://localhost:3005/api/get_projects`);
    const json = await response.json();

    if (json.length > 0) {
      let temp = `<tr>
                        <th style="width: 5%">ID</th>
                        <th style="width: 8%">Project Name</th>
                        <th style="width: 10%">Parent Company</th>
                        <th style="width: 5%">Tasks</th>
                        <th style="width: 6%">Status</th>
                        <th style="width: 7%">Start Date</th>
                        <th style="width: 7%">Due Date</th>
                        <th style="width: 5%">Budget</th>
                        <th style="width: 8%">Action</th>
                    </tr>`;

      // Fetch all client names concurrently
      const fetchClientNames = json.map(async (project) => {
        const clientResponse = await fetch(
          "http://localhost:3005/api/get_client_name",
          {
            method: "POST",
            body: JSON.stringify({
              id: project.company_id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const clientJson = await clientResponse.json();
        return clientJson[0].name;
      });

      // Wait for all client name fetches to complete
      const clientNames = await Promise.all(fetchClientNames);

      json.forEach((project, index) => {
        temp += `<tr id="${project.id}" class="border-bottom">`;
        temp += `<td>PROJ-BL${project.id}</td>`;
        temp += `<td>${project.project_name}</td>`;
        temp += `<td>${clientNames[index]}</td>`;
        temp += `<td>${project.tasks}</td>`;
        temp += `<td>
                    <div class="btn btn-outline-warning py-1">
                    ONGOING
                    </div>
                  </td>`;
        temp += `<td>${project.budget}</td>`;
        temp += `<td>${project.start_date.slice(0, 10)}</td>`;
        temp += `<td>${project.due_date.slice(0, 10)}</td>`;
        temp += `<td>
                  
                    <div
                    class="btn btn-secondary py-1 my-2 px-3 me-1"
                    onclick="delete_project(event)"
                    >
                    <i class="far fa-edit"></i>
                    </div>
                    <div
                    class="btn btn-danger py-1 my-2 px-3"
                    onclick="delete_project(event)"
                    >
                    <i class="fas fa-trash-alt"></i>
                    </div>
                </td>`;
        temp += `</tr>`;
      });

      // Update the table once all data is processed
      project_table.innerHTML = temp;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

setup_project();

///// DISPLAY ADD NEW PROJECT ////////
const add_project_bar = () => {
  add_new_project.style.display = "block";
};

/////// HIDE ADD NEW PROJECT ///////////
const hide_new_project_form = () => {
  add_new_project.style.display = "none";
};

//////// ADD NEW PROJECT //////////
const save_new_project = () => {
  fetch("http://localhost:3005/api/add_projects", {
    method: "POST",
    body: JSON.stringify({
      s: "S",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
};
