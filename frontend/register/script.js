"use strict";
const submitBtn = document.getElementById("submit");
const registerSuccessModal = new bootstrap.Modal("#registerSuccessModal", {
  keyboard: false,
});

const forms = document.querySelectorAll(".needs-validation");

const confirmPassword = document.getElementById("confirm-password").value;

Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        axios
          .post("http://localhost:8000/api/v1/users/register", {
            username: username,
            email: email,
            password: password,
          })
          .then(() => {
            registerSuccessModal.show();
          });
      }

      form.classList.add("was-validated");
    },
    false
  );
});

// submitBtn.addEventListener("click", async (event) => {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("pwd").value;
//   await axios
//     .post("http://localhost:8000/api/v1/users/register", {
//       username: username,
//       email: email,
//       password: password,
//     })
//     .then(() => {
//       registerSuccessModal.show();
//     });
// });
