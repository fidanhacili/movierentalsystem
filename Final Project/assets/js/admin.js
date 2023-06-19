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
const publishBtn = document.getElementById("publishBtn");
const deleteBtn = document.getElementById("deleteBtn");

const preloader = $(".preloader");
const selectedMoviedId = sessionStorage.getItem("selectedMoviedId");
const addWishListBtn = document.getElementById('addWishListBtn')
let addedImgBase64;
function returnMovies() {
  return get(ref(db, "/movies")).then((data) => data?.val());
}

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (selectedMoviedId) {
    removeVideo();

    return;
  }
});

addWishListBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const allMovies = await returnMovies()
  console.log('gelsin bura',allMovies)
  if (selectedMoviedId) {
    const parsedArr  = JSON.parse(localStorage.getItem('wishListIds'))
    const hasArrayLength = Array.isArray(parsedArr) && parsedArr.length
    const wishListItem = allMovies?.find?.(m => m?.id === Number(selectedMoviedId))
    console.log({wishListItem})
    localStorage.setItem('wishListIds',JSON.stringify(hasArrayLength ? [...parsedArr, wishListItem] :
      [wishListItem] ) )
  }
});
publishBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedMoviedId) {
    updateSelectedVideo();
    return;
  }
  addNewVideo();
});

document.getElementById("validatedCustomFile").onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement,
    files = tgt.files;
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      addedImgBase64 = fr.result;
    };
    fr.readAsDataURL(files[0]);
  }
  else {
    
  }
};

function preview_image(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output_image");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

async function addNewVideo() {
  console.log({ addedImgBase64 });

  const allMovies = await returnMovies();
  var selected = $("input[type='radio']:checked");
  set(ref(db, "movies/" + allMovies.length), {
    name: $("#videoTitle").val(),
    videoType: $("#videoType").val(),
    imageSrc: addedImgBase64,
    id : allMovies.length -1,
    team: $("#team").val(),
    genere: $("#genere").val(),
    lang: $("#lang").val(),
    description: $("#description").val(),
    types: selected.val(),
    createAt: moment().format("MM-DD-YYYY")
  }).then(() => alert("data stored succesdfully"));
}

async function getSelectedMovie() {
  const dbRef = ref(db);

  const allMovies = await returnMovies();
    const foundedIndex = allMovies?.findIndex?.(m => m?.id === Number(selectedMoviedId))
  get(child(dbRef, "movies/" + foundedIndex)).then(
    (selectedMovie) => {
      if (selectedMovie?.exists()) {
        console.log(selectedMovie);
        var selected = $("input[type='radio']:checked");

        $(selected).attr("checked", false);
        const transformedSelectedMovie = selectedMovie.val();
        var foundedRadioBox = $(`#${transformedSelectedMovie.types}`);

        console.log({ transformedSelectedMovie });

        $("#videoType").val(transformedSelectedMovie.videoType);
        $("#videoTitle").val(transformedSelectedMovie.name);
        $("#team").val(transformedSelectedMovie.team);
        $("#genere").val(transformedSelectedMovie.genere);
        $("#lang").val(transformedSelectedMovie.lang);
        $("#description").val(transformedSelectedMovie.description);
        $(foundedRadioBox).attr("checked", true);
        $("#output_image").attr("src", transformedSelectedMovie.imageSrc);

        $(preloader).removeClass("active");
      }
    }
  );
}

if (selectedMoviedId) {
  $(preloader).addClass("active");
  getSelectedMovie();
}
console.log("test", returnMovies());

async function updateSelectedVideo() {
  const allMovies = await returnMovies();
  console.log({ allMovies });
  const foundedVideo = allMovies?.find?.(
    (movie) => movie?.id === Number(selectedMoviedId)
  );

  const foundedIndex = allMovies?.findIndex?.(m => m?.id === Number(selectedMoviedId))

  var selected = $("input[type='radio']:checked");
  update(ref(db, "movies/" + foundedIndex), {
    name: $("#videoTitle").val(),
    videoType: $("#videoType").val(),
    imageSrc: foundedVideo.imageSrc,
    team: $("#team").val(),
    genere: $("#genere").val(),
    lang: $("#lang").val(),
    description: $("#description").val(),
    types: selected.val(),
  }).then(() => alert("data stored succesdfully"));
}

async function removeVideo() {
  const allMovies = await returnMovies();
  const foundedVideo = allMovies?.find?.(
    (movie) => movie?.id === Number(selectedMoviedId)
  );
  remove(ref(db, "movies/" + Number(foundedVideo?.id - 1)));
}
