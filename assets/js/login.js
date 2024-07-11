const username = document.getElementById(`login_id`);
const password = document.getElementById(`login_password`);

function validate_Login() {
  if (username.value == "admin") {
    fetch(`http://localhost:3005/api/admin_login`, {
      method: "POST",
      body: JSON.stringify({
        user_id: login_id.value,
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
  } else {
    console.log("dfg");
  }
}
