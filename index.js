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
          <div class="movie-details">
            <p class="movie-year">${movie.Year}</p>
            <p class="movie-director">${movie.Director}</p>
          </div>
        </div>
    </div>
  `
}

const renderMovieErrorMsg = () => {
  const mainSectionElement = document.querySelector('.main-section');

  mainSectionElement.innerHTML = `
    <div class="error-message">Movie not Found</div> 
  `
}

// const fetchMovieByTitle = (title) => {
//   axios.get(`http://www.omdbapi.com/?apikey=acad1200&t=${title}`).then((res) => {
//     if (res.data.Error) {
//       renderMovieErrorMsg();
//     } else {
//       renderMovieItem(res.data);
//     }
//   })
// }

const searchInMovieValue = () => {
  return document.getElementById('searchInMovie').checked;
}

const createMovieTemplate = (movie) => {
  const template =`
    <div onClick="getMovieDetails(event)" class="movie-card">
      <img data-title="${movie.Title}" src="${movie.Poster}" class="movie-poster" />
      <p class="movie-title">${movie.Title}</p> 
    </div>
	`
  
  return template;
}

const renderAllMovies = (movies) => {
	const mainSectionElement = document.querySelector('.main-section');
  const renderedTemplate = movies.map((movie) => {
  	return createMovieTemplate(movie)
  })
	mainSectionElement.innerHTML = renderedTemplate.join('');
}

// const fetchMovieWithSearch = (title) => {
//   axios.get(`http://www.omdbapi.com/?apikey=acad1200&s=${title}`).then((res) => {
//     if (movie.data.Error) {
//       renderMovieErrorMsg()
//     } else {
//       renderAllMovies(res.data.Search);
//     }
//   })
// }

const addEventListnerToMoviesCard = () => {
  document.querySelectorAll('.movie-card').forEach((movieElement) => {
    movieElement.addEventListner('click', (event) => {
      console.log(event);
    })
  })
}

const fetchMovies = (inSearch, params, title) => {
  const qaryParam = inSearch ? 's' : 't';
  const additionalParams = params ? `&type=${params}` : '';

  console.log(inSearch, params, title);

  axios.get(`http://www.omdbapi.com/?apikey=acad1200&${qaryParam}=${title}${additionalParams}`).then((res) => {
    if (res.data.Error) {
      renderMovieErrorMsg();
    } else {
      if (inSearch) {
        renderAllMovies(res.data.Search);
      } else {
        renderMovieItem(res.data);
      }
    }
  })
}

const getMovieDetails = (event) => {
  const movieTitle = event.target.dataset.title;
  fetchMovies(false, movieTitle);
}

const getAdditionalParams = () => {
  const type = document.getElementById('searchType');
  return type.value;
}

document.querySelector('.search-btn').addEventListener('click', () => {
  const searchInputElement = document.querySelector('.search-input');
  const movieTitle = getMovieTitle();
  const additionalParams = getAdditionalParams(); 

  if (movieTitle) {
    fetchMovies(searchInMovieValue(), additionalParams, movieTitle);
  } else {
    alert('Title is required!')
  }

  // if (searchInMovieValue()) {
  //   fetchMovieWithSearch(movieTitle);
  // } else {
  //   fetchMovieByTitle(movieTitle);
  // }

  searchInputElement.value = '';
})
