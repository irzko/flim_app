const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("pwd").value;
  axios
    .post("http://localhost:8000/api/v1/users/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      const res_data = response.data;
      if (res_data.status === "success") {
        document.cookie = `username=${res_data.data.username}; path=/`;
        location.href = "/";
      } else {
      }
    })
    .catch((error) => {
      const alert = document.getElementById("login-alert");
      alert.classList.add(
        "alert",
        "alert-danger",
        "col-lg-4",
        "offset-lg-4",
        "mt-2"
      );
      alert.innerText = error.response.data.message;
    });
});
