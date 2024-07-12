const username = document.getElementById(`login_id`);
const password = document.getElementById(`login_password`);

function validate_Login() {
  if (username.value == "admin") {
    fetch(`http://localhost:3005/api/admin_login`, {
      method: "POST",
      body: JSON.stringify({
        user_id: username.value,
        password: password.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          sessionStorage.setItem("log_cred", username.value);
          window.location.href = "/clients.html";
        } else {
          Swal.fire("Invalid Credentails!");
        }
      });
  } else if (username.value.startsWith("DEV-JD")) {
    fetch(`http://localhost:3005/api/employee_login`, {
      method: "POST",
      body: JSON.stringify({
        user_id: username.value.slice(6),
        password: password.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          sessionStorage.setItem("log_cred", username.value);
          window.location.href = "/member.html";
        } else {
          Swal.fire("Invalid Credentails!");
        }
      });
  } else if (username.value.startsWith("DEV-TL")) {
    fetch(`http://localhost:3005/api/teamlead_login`, {
      method: "POST",
      body: JSON.stringify({
        user_id: username.value.slice(6),
        password: password.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          sessionStorage.setItem("log_cred", username.value);
          window.location.href = "/teamlead.html";
        } else {
          Swal.fire("Invalid Credentails!");
        }
      });
  } else {
    Swal.fire("Invalid Credentails!");
  }
}
