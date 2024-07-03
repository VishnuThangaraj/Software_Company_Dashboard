const username = document.getElementById(`trainer_login_id`);
const password = document.getElementById(`trainer_login_password`);
const invalid_cred = document.getElementById(`invalid_cred`);
const main_ccs = document.getElementById(`main_cc`);

function validate_Login() {
  if (username.value == "admin" && password.value == "admin123") {
    window.location.href = "http://127.0.0.1:5500/index.html";
  } else {
    Swal.fire("Invalid Credentails!");
  }
}

function refresh_page() {
  window.location.href = "http://127.0.0.1:5500/login.html";
}
