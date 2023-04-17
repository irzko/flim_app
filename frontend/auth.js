const cookie = document.cookie;

let username = "";

if (cookie) {
  const cookieValue = cookie
    .split("; ")
    .find((row) => row.startsWith("username="))
    .split("=")[1];
  if (cookieValue) {
    if (location.pathname === "/login/" || location.pathname === "/register/") {
      location.href = "/";
    }
    username = cookieValue;
  }
}
