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

const selectedMoviedId = sessionStorage.getItem("selectedMoviedId");

function returnMovies() {
  return get(ref(db, "/movies")).then((data) => data?.val());
}
async function getSelectedMovie() {
  const dbRef = ref(db);

  const allMovies = await returnMovies()

const foundedMovieId =   allMovies.find(m => m.id === Number(selectedMoviedId)).id
  get(child(dbRef, 'movies/' + foundedMovieId)).then((selectedMovie) => {
    if (selectedMovie?.exists()) {
      const transformedSelectedMovie  = selectedMovie.val()
      console.log({transformedSelectedMovie})
      $('#types').text(transformedSelectedMovie.types)
      $('#name').text(transformedSelectedMovie.name)
      $('#videoType').text(transformedSelectedMovie.videoType)
      $('#duration').text(transformedSelectedMovie.duration)
      $('#name_add').text(transformedSelectedMovie.name)
      $('#genere').text(transformedSelectedMovie.genere)
      $('#team').text(transformedSelectedMovie.team)
      $('#team_add').text(transformedSelectedMovie.team)
      $('#description').text(transformedSelectedMovie.description)
    }
  });
}


getSelectedMovie()