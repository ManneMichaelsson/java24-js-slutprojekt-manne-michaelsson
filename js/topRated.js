const API_KEY = "0116dcb4747271590a57fda4bfdb5623"; 

const baseUrl = "https://api.themoviedb.org/3";

const url = `${baseUrl}/movie/top_rated?api_key=${API_KEY}&language=sv-SE&page=1`;

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const topRatedContainer = document.getElementById("topTenContainer");

const searchMovieForm = document.getElementById("movieSearchForm")
const searchPersonForm = document.getElementById("personSearchForm")

const searchMovieInput = document.getElementById("movieSearchInput")
const searchPersonInput = document.getElementById("personSearchInput")

async function fetchTopRatedMovies() {
    try {
        const response = await fetch(url)
        const data = await response.json();
        const movies = data.results.slice(0, 10);

        displayMovies(movies);
    } catch(error){
        console.error("något gick fel:", error)
        topRatedContainer.innerHTML = "<p>Kunde inte ladda filmer just nu";
    }
}

function displayMovies(movies) {
    topRatedContainer.innerHTML = "";

    let topTenNumber = 1;

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
        <h3>Top ${topTenNumber}</h3>
            <img src="${imageBaseUrl + movie.poster_path}" alt="${movie.title}" />
            <div class="info">
                <h3>${movie.title}</h3>
                <p>Släppt: ${movie.release_date}</p>
                <p>Score: ${movie.vote_average}</p>
            </div>
        `;

        topTenNumber++;
        topRatedContainer.appendChild(movieCard);
    });
}

fetchTopRatedMovies();