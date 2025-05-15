const API_KEY = "0116dcb4747271590a57fda4bfdb5623"; 

const baseUrl = "https://api.themoviedb.org/3";

const url = `${baseUrl}/movie/popular?api_key=${API_KEY}&language=sv-SE&page=1`;

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const topRatedContainer = document.getElementById("topTenContainer");

const searchMovieForm = document.getElementById("movieSearchForm")
const searchPersonForm = document.getElementById("personSearchForm")

const searchMovieInput = document.getElementById("movieSearchInput")
const searchPersonInput = document.getElementById("personSearchInput")

//hämtar data från API:n 
async function fetchPopularMovies(){
    try{
        //hämtar data från URL, väntar på att svaret från server har konverterats till json-format och sparar det i en variabel
        const response = await fetch(url)
        const data = await response.json();
        const movies = data.results.slice(0,10);

        displayMovies(movies)
    }
    catch (error){
        console.error("Kunde inte hämta filmer")
        topRatedContainer.innerHTML = "<p>Kunde inte hämta filmer </p>";
    }
}

//Metod för att visa upp resultatet, tar emot en variabel som är en array
function displayMovies(movies){
    topRatedContainer.innerHTML = ""; //rensat från tidigare resultat

    //för varje movie i movies så skapas det en ny div men info i sig om filmen. 
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${imageBaseUrl + movie.poster_path}" alt="${movie.title}" />
            <div class="info">
                <h3>${movie.title}</h3>
                <p>Släppt: ${movie.release_date}</p>
                <p>Score: ${movie.vote_average}</p>
            </div>
        `;
        //Gör den synlig i container
        topRatedContainer.appendChild(movieCard);
    });

}


personSearchForm.addEventListener("submit", function(event){
    event.preventDefault();
    const searchTerm = document.getElementById("personSearchInput").value;

    if(searchTerm.trim() !== ""){
        window.location.href = `/index.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
        alert("Vänligen ange ett namn för att söka efter en person.");
    }
})

movieSearchForm.addEventListener("submit", function(event){
    event.preventDefault();
    const searchTerm = document.getElementById("movieSearchInput").value;

    if(searchTerm.trim() !== ""){
        window.location.href = `/index.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
        alert("Vänligen ange ett namn för att söka efter en film.");
    }
})

function goToIndex(type, searchTerm) {
    const path = window.location.pathname;
    const isGithubPages = path.includes("java24-js-slutprojekt-manne-michaelsson");

    const basePath = isGithubPages ? "/java24-js-slutprojekt-manne-michaelsson" : "";
    window.location.href = `${basePath}/index.html?type=${type}&search=${encodeURIComponent(searchTerm)}`;
}

searchMovieForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = movieSearchInput.value.trim();

    if (searchTerm) {
        goToIndex("movie", searchTerm);
    }
});

searchPersonForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = personSearchInput.value.trim();

    if (searchTerm) {
        goToIndex("person", searchTerm);
    }
});

fetchPopularMovies();