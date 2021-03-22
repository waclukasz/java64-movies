const getMovieTitle = () => {
  const searchInputElement = document.querySelector('.search-input');
  return searchInputElement.value;
}

const renderMovieItem = (movie) => {
  const mainSectionElement = document.querySelector('.main-section');

  mainSectionElement.innerHTML = `
    <div class="movie">
      <div>
        <img src="${movie.Poster}" alt="" class="movie-poster" />
      </div>
        <div>
          <p class="movie-title">${movie.Title}</p>
          <p class="movie-plot">${movie.Plot}</p>
        </div>
    </div>
  `
}

const fetchMovieByTitle = (title) => {
  axios.get(`http://www.omdbapi.com/?apikey=acad1200&t=${title}`).then((res) => {
    console.log(res);
    renderMovieItem(res.data);
  })
}

document.querySelector('.search-btn').addEventListener('click', () => {
  const searchInputElement = document.querySelector('.search-input');
  const movieTitle = getMovieTitle();

  fetchMovieByTitle(movieTitle);

  searchInputElement.value = '';
})
