const infoElement = document.getElementById("info-theatre");
const time = JSON.parse(localStorage.getItem("time"));
const seatContainer = document.getElementById("seat-container");

const data = JSON.parse(localStorage.getItem("time"));
const seatsSelected = [];
let price = 0;
let totalPrice = 0;

document.addEventListener("DOMContentLoaded", async () => {
  const res_showtime = await axios.post(
    `http://localhost:8000/api/v1/showtimes/full`,
    {
      date: data.start_time,
      theatre_id: data.theatre_id,
      movie_id: data.movie_id,
    }
  );

  const showtime = res_showtime.data;
  price = showtime[0].price;

  const movie_res = await axios.get(
    "http://localhost:8000/api/v1/movies/" + time.movie_id
  );

  const theatre_res = await axios.get(
    "http://localhost:8000/api/v1/theatres/" + time.theatre_id
  );

  const theatre = theatre_res.data;
  const movie = movie_res.data;
  infoElement.innerHTML = `
  <div class="row">
    <span class="fs-5"> Phim: ${movie[0].title}</span>
    <span> Thời gian bắt đầu: ${data.start_time}</span>
  </div>
  `;

  const seats_res = await axios.get(
    "http://localhost:8000/api/v1/seats/" + data.theatre_id
  );

  const seats = seats_res.data;

  const seatItem = document.createElement("div");
  // seatItem.classList.add("col-sm", "col-md-6", "col-lg-4");

  const el = seats.map((seat, index) => {
    if (index % 3 === 0) {
      return `</div><div class="d-flex gap-2 mb-2">
      <div>
      <input type="checkbox" class="btn-check" name="seat" id="seat${
        seat.seat_id
      }" autocomplete="off" ${seat.status === 1 ? "disabled" : ""}>
      <label class="btn ${
        seat.status === 1 ? "btn-danger" : "btn-outline-primary"
      } seat" for="seat${seat.seat_id}">${seat.name}</label>
    </div>`;
    }
    return `
    <div>
      <input type="checkbox" class="btn-check" name="seat" id="seat${
        seat.seat_id
      }" autocomplete="off" ${seat.status === 1 ? "disabled" : ""}>
      <label class="btn ${
        seat.status === 1 ? "btn-danger" : "btn-outline-primary"
      } seat" for="seat${seat.seat_id}">${seat.name}</label>
    </div>`;
  });

  seatItem.innerHTML = el.join("");
  seatContainer.appendChild(seatItem);
  const priceElement = document.getElementById("price");
  priceElement.innerText = "Tổng: 0 VNĐ";

  const seatBtn = document.getElementsByClassName("btn-check");
  for (let i = 0; i < seatBtn.length; i++) {
    seatBtn[i].addEventListener("click", (e) => {
      if (seatBtn[i].checked) {
        seatsSelected.push(seats[i]);
        totalPrice = price * seatsSelected.length;
        priceElement.innerText = "Tổng: " + totalPrice + " VNĐ";
      } else {
        seatsSelected.splice(seatsSelected.indexOf(seats[i]), 1);
        totalPrice = price * seatsSelected.length;
        priceElement.innerText = "Tổng: " + totalPrice + " VNĐ";
      }
      // seatsSelected.push(seats[i]);
    });
  }
  const myModal = document.getElementById("exampleModal");
  myModal.addEventListener("show.bs.modal", (event) => {
    document.getElementById(
      "movie-name"
    ).innerText = `Tên phim: ${movie[0].title}`;
    document.getElementById("theatre-name").innerText = `Rạp: ${theatre.name} `;
    document.getElementById(
      "theatre-address"
    ).innerText = `Địa chỉ: ${theatre.address} `;
    document.getElementById(
      "total-price"
    ).innerText = `Tổng tiền: ${totalPrice} VNĐ`;

    const seats = seatsSelected.map((seat) => {
      return `<span>${seat.name}</span>`;
    });

    document.getElementById("seats").innerHTML = "Số ghế: " + seats.join(", ");
    const bookingBtn = document.getElementById("booking-btn");
    bookingBtn.addEventListener("click", async () => {
      const username_res = await axios.get(
        "http://localhost:8000/api/v1/users/id/" + username
      );
      const user_id = username_res.data;

      axios
        .post("http://localhost:8000/api/v1/bookings", {
          quantity: seatsSelected.length,
          showtime_id: showtime[0].showtime_id,
          user_id: user_id[0].user_id,
          seats: seatsSelected,
        })
        .then((res) => {
          // alert("Đặt vé thành công");
          const bookingAlertModal = new bootstrap.Modal("#bookingAlert");
          bookingAlertModal.show();
          document
            .querySelector("#confirm-btn")
            .addEventListener("click", () => {
              location.reload();
            });
        });
    });
  });
});

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
