const authElement = document.querySelector("#auth");

if (username) {
  const userElement = document.createElement("div");
  userElement.innerHTML = `<li class="nav-item dropdown">
  <a
    class="nav-link dropdown-toggle"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Xin chào, ${username}!
  </a>
  <ul class="dropdown-menu">
    <li><span class="dropdown-item" id="logout">Đăng xuất</span></li>
  </ul>
</li>`;
  authElement.appendChild(userElement);
  document.querySelector("#logout").addEventListener("click", () => {
    document.cookie = `username=; path=/`;
    location.href = "/";
  });
} else {
  location.href = "/login";
}

document.addEventListener("DOMContentLoaded", async () => {
  const username_res = await axios.get(
    "http://localhost:8000/api/v1/users/id/" + username
  );
  const user_id = username_res.data;
  const response = await axios.get(
    "http://localhost:8000/api/v1/bookings/" + user_id[0].user_id
  );
  const bookings = response.data;
  const bookingElement = document.querySelector("#ticket-data");

  const bookingList = bookings.map((booking) => {
    return `
    <tr>
      <th scope="row">${booking.booking_id}</th>
      <td>${booking.title}</td>
      <td>${booking.name}</td>
      <td>${booking.quantity}</td>
      <td>${booking.price} VNĐ</td>
      <td>${booking.price * booking.quantity} VNĐ</td>
      <td><button class="btn btn-danger delete-ticket me-md-2 mb-2 mb-md-0">Xoá</button><button class="btn btn-warning info-ticket">Chi tiết</button></td>
    </tr>
    `;
  });
  bookingElement.innerHTML = bookingList.join("");
  const btnDelete = document.querySelectorAll(".delete-ticket");
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener("click", async () => {
      const booking_id =
        btnDelete[i].parentElement.parentElement.children[0].innerHTML;
      const response = await axios.delete(
        "http://localhost:8000/api/v1/bookings/" + booking_id
      );
      location.reload();
    });
  }

  const btnInfo = document.querySelectorAll(".info-ticket");
  for (let i = 0; i < btnInfo.length; i++) {
    btnInfo[i].addEventListener("click", async () => {
      const res_seats = await axios.get(
        "http://localhost:8000/api/v1/seats/booking/" + bookings[i].booking_id
      );
      const seats = res_seats.data;
      const seatList = seats[0].map((seat) => {
        return seat.name;
      });

      const infoTicketModal = new bootstrap.Modal("#infoTicketModal");
      infoTicketModal.show();
      const infoTicketContent = document.querySelector("#info-ticket-content");
      infoTicketContent.innerHTML = `
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Tên phim: ${bookings[i].title}</li>
        <li class="list-group-item">Ngày chiếu: ${bookings[i].start_time}</li>
        <li class="list-group-item">Tên rạp: ${bookings[i].name}</li>
        <li class="list-group-item">Địa chỉ: ${bookings[i].address}</li>
        <li class="list-group-item">Số ghế: ${seatList.join(", ")}</li>
        <li class="list-group-item">Đơn giá vé: ${bookings[i].price} VNĐ</li>
        <li class="list-group-item">Tổng tiền: ${
          bookings[i].price * bookings[i].quantity
        } VNĐ</li>
      </ul>
      `;
    });
  }

  document.querySelector("#print").addEventListener("click", () => {
    window.print();
  });
});
