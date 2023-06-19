import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

const currentUser = localStorage.getItem("currentUser");
$("#mainCr").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

console.log({ currentUser });

const firebaseConfig = {
  apiKey: "AIzaSyDJT-yvbenM7jSqIt0UUOWQQixROpvV64o",
  authDomain: "movieapplication-55deb.firebaseapp.com",
  projectId: "movieapplication-55deb",
  storageBucket: "movieapplication-55deb.appspot.com",
  messagingSenderId: "511398606130",
  appId: "1:511398606130:web:3f793afebeda127754532b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (currentUser) {
  $("#logInOutBtn").text("Log Out");
  $("#userName").text(currentUser);

  $("#userName").addClass("active");
}

$("#logInOutBtn").on("click", (e) => {
  e.preventDefault();
  if (!currentUser) {
    window.location.href = "/login.html";
  } else {
    localStorage.removeItem("currentUser");
    $("#userName").removeClass("active");

    window.location.href = "/register.html";
  }
});
import {
  getDatabase,
  set,
  ref,
  get,
  update,
  remove,
  child,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const db = getDatabase();

// console.log('today', moment())
const lastMoviesWrapper = document.getElementById("lastVideosCr");
const liveStreaming = document.getElementById("liveStreaming");

const topLastElementsWrapper = document.getElementById(
  "topLastElementsWrapper"
);
const bottomLastElementsWrapper = document.getElementById(
  "bottomLastElementsWrapper"
);
const recentMoviesWrapper = document.getElementById("recentMoviesWrapper");

const today = document.getElementById("today");

today?.addEventListener("click", async (e) => {
  e.preventDefault();

  const datas = await returnMovies();
  console.log("click", datas);

  recentMoviesWrapper.innerHTML = null;

  const todayMovies = datas?.filter((data) =>
    moment(data.createAt).isSame(moment(), "day")
  );
  console.log({ todayMovies });
  todayMovies.forEach((movie) => {
    const item = `
    <div class="item">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${movie.imageSrc}" alt="Card image cap">
      <div class="card-body">
        <p class="card-text">${movie.name}</p>
      </div>
    </div>
  </div>`;
    recentMoviesWrapper.innerHTML += `
    <div class="item col-lg-3">
        ${item}
    </div>
    `;
  });
});

function getsomething() {
  get(ref(db, "/something")).then((data) => {
    data?.val().forEach((element) => {
      lastMoviesWrapper.innerHTML += `
            <div class="item">
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="${element.imageSrc}" alt="Card image cap">
              <div class="card-body">
                <p class="card-text">${element.name}</p>
              </div>
            </div>
          </div>`;
    });
  });
}

function GetLastVideos() {
  get(ref(db, "/movies")).then((data) => {
    console.log(data.val());

    const sortedAsc = data
      .val()
      .sort(
        (objA, objB) =>
          Number(new Date(objB.createAt)) - Number(new Date(objA.createAt))
      );

    const lastElements = sortedAsc.slice(0, 4);
    lastElements.forEach((element) => {
      topLastElementsWrapper.innerHTML += `
        <div class="col-3">
        <div class="card">
          <div class="image">
            <div class="column">
                <div>
                    <div class="movie-image">
                      <img src="${element.imageSrc}" class="img-fluid">
                    </div>
                </div>
            </div>
            <span class="badge badge-warning">Premium</span>
            <p class="score">8.4/10</p>
            <!-- <ul class="movies-list">
                <li><a href="#"><i class="las la-heart"></i></a></li>
                <li><a href="#"><i class="las la-play"></i></a></li>
                <li><a href="#"><i class="las la-tag"></i></a></li>
            </ul> -->
        </div>
       <div class="about">
        <div class="d-flex align-items-center justify-content-between">
          <h6>
              <a class='movieName' id="${element.id}" style='color:black !important' href='./movieDetail.html'>${element.name}</a>
          </h6>
          <p><a href="#">Comedy</a></p>
      </div>
       </div>
        </div>
      </div>`;
    });

    lastElements.forEach((element) => {
      bottomLastElementsWrapper.innerHTML += `
        <div class="col-3">
        <div class="card">
          <div class="image">
            <div class="column">
                <div>
                    <div class="movie-image">
                      <img src="${element.imageSrc}" class="img-fluid">
                    </div>
                </div>
            </div>
            <span class="badge badge-warning">Premium</span>
            <p class="score">8.4/10</p>
            <!-- <ul class="movies-list">
                <li><a href="#"><i class="las la-heart"></i></a></li>
                <li><a href="#"><i class="las la-play"></i></a></li>
                <li><a href="#"><i class="las la-tag"></i></a></li>
            </ul> -->
        </div>
       <div class="about">
        <div class="d-flex align-items-center justify-content-between">
          <h6>
              <a>${element.name}</a>
          </h6>
          <p><a href="#">Comedy</a></p>
      </div>
       </div>
        </div>
      </div>`;
    });
  }).then(()=>{
    const movieNames = document.querySelectorAll('.movieName')

    movieNames.forEach(movie => {
      movie.addEventListener('click',((e) => {
        e.preventDefault()
          const id =$(movie).attr('id')

          sessionStorage.setItem('selectedMoviedId',id)

          window.location = './admin.html'
      }))
    })


  });
}

GetLastVideos();
function GetAllMovies() {
  get(ref(db, "/movies"))
    .then((data) => {
      data?.val().forEach((element) => {
        const item = `
        <div class="item">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${element.imageSrc}" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">${element.name}</p>
          </div>
        </div>
      </div>`;
        lastMoviesWrapper.innerHTML += item;
        recentMoviesWrapper.innerHTML += `
        <div class="item col-lg-3">
            ${item}
        </div>
        `;
      });
    })
    .then(() => {
      $("#lastVideosCr").owlCarousel({
        loop: true,
        margin: 2,
        nav: true,
        responsive: {
          0: {
            items: 5,
          },
          600: {
            items: 5,
          },
          1000: {
            items: 5,
          },
        },
      });
    });
}

function returnMovies() {
  return get(ref(db, "/movies")).then((data) => data?.val());
}
GetAllMovies();

function returnLiveStreaming() {
  return get(ref(db, "/liveStreamings")).then((data) => data?.val());
}
async function SetLiveStreamings() {
  const items = await returnLiveStreaming();

  items.forEach((item) => {
    const liveElement = `<div class="items" style="background-image: url('${item.imageSrc}')">
        <div class="layer livesLayer">
          <button class="btn btn-danger">Live</button>
          <p>${item.name}</p>
        </div>
      </div>`;
    liveStreaming.innerHTML += liveElement;
  });

  $("#liveStreaming").owlCarousel({
    loop: true,
    margin: 2,
    nav: true,
    responsive: {
      0: {
        items: 5,
      },
      600: {
        items: 5,
      },
      1000: {
        items: 5,
      },
    },
  });
}
SetLiveStreamings();

