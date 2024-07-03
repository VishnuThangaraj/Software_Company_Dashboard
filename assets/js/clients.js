////////// SEND SMALL MAIL ///////////////
const send_mail = () => {
  const to = document.getElementById(`company_mail_list`),
    subject = document.getElementById(`company_mail_subject`),
    message = document.getElementById(`company_mail_message`);

  fetch("http://localhost:3005/api/company_mail", {
    method: "POST",
    body: JSON.stringify({
      to: "vishnuthangaraj.developer@gmail.com",
      subject: subject.value,
      message: message.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

//////////// ADD NEW CLIENT ////////////
const add_client_bar = () => {
  console.log("hi");
};
