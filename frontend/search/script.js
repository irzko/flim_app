let dateSelected = "";
let locationSelected = "";
let movie_id = "";

const bookingDate = (date) => {
  return date.toLocaleDateString().split("/");
};
const dateNow = new Date();
let listDate = [];
for (let i = 0; i < 30; i++) {
  const date = new Date(dateNow.getTime() + 86400000 * i);
  listDate.push(date);
}

const filmContainer = document.querySelector("#film-container");

const fetchShowtime = () => {
  axios
    .post(`http://localhost:8000/api/v1/theatres/get`, {
      date: `${dateSelected[2]}-${dateSelected[1]}-${dateSelected[0]}`,
      location: locationSelected,
      movie_id: movie_id,
    })
    .then((response) => {
      const theatreElement = document.getElementById("theatre");
      theatreElement.innerHTML = "";
      if (response.data.length === 0) {
        theatreElement.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            Không có lịch chiếu nào
          </div>
        </div>
        `;
      } else {
        response.data.forEach(async (theatre) => {
          const theatreItem = document.createElement("div");
          const showtime = await axios.post(
            `http://localhost:8000/api/v1/showtimes`,
            {
              date: `${dateSelected[2]}-${dateSelected[1]}-${dateSelected[0]}`,
              theatre_id: theatre.theatre_id,
              movie_id: movie_id,
            }
          );

          const showtimeElement = showtime.data.map(
            (time) =>
              "<button class='btn btn-outline-primary col time-m8c'>" +
              new Date(time.start_time).toLocaleTimeString().substring(0, 5) +
              "</button>"
          );

          theatreItem.classList.add("col-sm", "col-md-6", "col-lg-4");
          theatreItem.innerHTML = `
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">${theatre.name}</h6>
                  <p class="card-text row gap-1">
                    ${showtimeElement.join("")}
                  </p>
                </div>
              </div>
              `;
          theatreElement.appendChild(theatreItem);
          const timeBtn = document.getElementsByClassName("time-m8c");
          for (let i = 0; i < timeBtn.length; i++) {
            timeBtn[i].addEventListener("click", (event) => {
              const searchParams = `movie_id=${movie_id}&theatre_id=${theatre.theatre_id}&start_time=${dateSelected[2]}-${dateSelected[1]}-${dateSelected[0]}`;
              window.location.assign("booking?sqs=" + searchParams);
            });
          }
        });
      }
    });
};

const selectLocation = () => {
  const city = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];
  const citySorted = city.sort();
  locationSelected = citySorted[0];
  const locationElement = document.getElementById("location");
  locationElement.innerHTML = "";
  citySorted.forEach((location, index) => {
    const locationItem = document.createElement("span");
    locationItem.classList.add("col");
    locationItem.innerHTML = `
    <input type="radio" class="btn-check location-selection" name="location" id="location${index}" autocomplete="off">
    <label class="btn d-grid btn-outline-primary location-btn" for="location${index}">${location}</label>
    `;
    locationElement.appendChild(locationItem);
  });

  document.querySelector(".location-selection").setAttribute("checked", "true");
  const locationBtn = document.getElementsByClassName("location-btn");
  for (let i = 0; i < locationBtn.length; i++) {
    locationBtn[i].addEventListener("click", () => {
      locationSelected = citySorted[i];
      fetchShowtime();
    });
  }
};

const showCalendar = () => {
  const calenderElement = document.getElementById("calender");
  calenderElement.innerHTML = "";
  dateSelected = listDate[0].toLocaleDateString().split("/");
  listDate.forEach((date, index) => {
    const dateString = date.toDateString().split(" ");
    const dateElement = document.createElement("span");
    dateElement.classList.add("col", "p-0");
    dateElement.innerHTML = `
    <input type="radio" class="btn-check date-selection" name="date" id="option${index}" autocomplete="off">
    <label class="btn d-grid btn-outline-primary date-start" for="option${index}">
    
    <div class="d-flex align-items-center">
      <div class="d-flex align-items-start flex-column">
        <span>${dateString[0]}</span>
        <span>${dateString[1]}</span>
      </div>
      <span class="fs-1">${dateString[2]}</span>
    </label>
          </div>
          `;
    calenderElement.appendChild(dateElement);
  });
  document.querySelector(".date-selection").setAttribute("checked", "true");
  const dateBtn = document.getElementsByClassName("date-start");
  for (let i = 0; i < dateBtn.length; i++) {
    dateBtn[i].addEventListener("click", () => {
      dateSelected = listDate[i].toLocaleDateString().split("/");
      fetchShowtime();
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const search = localStorage.getItem("search");
  const response = await axios.get(
    "http://localhost:8000/api/v1/movies/find/" + search
  );
  if (response.data) {
    const films = response.data;
    films.forEach((film) => {
      const filmElement = document.createElement("div");
      filmElement.classList.add(
        "film",
        "col-sm",
        "col-sm-6",
        "col-md-4",
        "col-lg-3",
        "mb-3"
      );
      filmElement.innerHTML = `
      <div class="card">
        <!-- <img src="http://localhost:8000/public/posters/${film.poster}" class="card-img-top" alt="..."> -->
        <div class="card-body">
          <h5 class="card-title">${film.title}</h5>
          <p class="card-text">
            <div><b>Thể loại:</b> ${film.genre}</div>
            <div><b>Thời lượng: </b>${film.duration} phút</div>
          </p>
          <a href="#" class="btn btn-primary booking-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Đặt vé</a>
        </div>
      </div>
      `;
      filmContainer.appendChild(filmElement);
    });
    const bookingBtn = document.getElementsByClassName("booking-btn");
    for (let i = 0; i < bookingBtn.length; i++) {
      bookingBtn[i].addEventListener("click", () => {
        movie_id = films[i].movie_id;
        document.getElementById(
          "exampleModalLabel"
        ).innerText = `Phim: ${films[i].title}`;
        showCalendar();
        selectLocation();
        fetchShowtime();
      });
    }
  }
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
  const userElement = document.createElement("div");
  userElement.innerHTML = `
  <li class="nav-item">
    <a class="nav-link" href="/login">Đăng nhập/Đăng ký</a>
  </li>
  `;
  authElement.appendChild(userElement);
}

const searchBtn = document.querySelector(".search");
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const search = document.querySelector(".search-input").value;
  localStorage.setItem("search", search);
  window.location.assign("/search");
});
