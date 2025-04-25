import { fetchSearchPerson, fetchSearchMovie } from './js/api.js';
import { displayPerson, displayMovies } from './js/display.js';

    const container = document.getElementById("searchResults");
    const sortSelect = document.getElementById("sortSelect");

    const searchPersonForm = document.getElementById("personSearchForm");
    const searchMovieForm = document.getElementById("movieSearchForm");
    const personSearchInput = document.getElementById("personSearchInput");
    const movieSearchInput = document.getElementById("movieSearchInput");

    let currentPersonResults = [];
    let currentMovieResults = [];

    //Personsökning
    searchPersonForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        
        //tömmer listorna från tidigare resultat
        currentPersonResults = [];
        currentMovieResults = [];

        const searchTerm = personSearchInput.value.trim();
        
        //kollar söktermen
        if (searchTerm) {
            fetchSearchPerson(searchTerm)
                .then(results => {
                    currentPersonResults = results;
                    sortAndDisplay(); 
                })
                .catch(error => {
                    container.innerHTML = "<p>Fel vid hämtning av personer.</p>";
                });
        }
    });

    //Filmsökning
    searchMovieForm.addEventListener("submit", (event) => {

        event.preventDefault();

        //tömmer listorna från tidigare resultat
        currentPersonResults = [];
        currentMovieResults = [];

        const searchTerm = movieSearchInput.value.trim();
        
        //kontrollerar sökterm
        if (searchTerm) {
            fetchSearchMovie(searchTerm)
                .then(results => {
                    currentMovieResults = results;
                    console.log("Filmer resultat:", results);
                    sortAndDisplay();
                })
                .catch(error => {
                    container.innerHTML = "<p>Fel vid hämtning av filmer.</p>";
                });
        }
    });

    // Sortering
    sortSelect.addEventListener("change", sortAndDisplay);

    //sorterar efter vad användaren vill sortera på
    function sortAndDisplay() {
        const sortBy = sortSelect.value; 

        //Skapa kopior på listor för personer och filmer
        const sortedPersonResults = [...currentPersonResults];
        const sortedMovieResults = [...currentMovieResults];

        //Sortera resultaten
        switch (sortBy) {
            case "nameAsc": //namn a-ö
                sortedPersonResults.sort((a, b) => a.name.localeCompare(b.name));
                sortedMovieResults.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "nameDesc": //namn ö-a
                sortedPersonResults.sort((a, b) => b.name.localeCompare(a.name));
                sortedMovieResults.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "popularityAsc": //minst populär först
                sortedPersonResults.sort((a, b) => a.popularity - b.popularity);
                sortedMovieResults.sort((a, b) => a.popularity - b.popularity);
                break;
            case "popularityDesc": //mest populär först
                sortedPersonResults.sort((a, b) => b.popularity - a.popularity);
                sortedMovieResults.sort((a, b) => b.popularity - a.popularity);
                break;
        }

        container.innerHTML = "";

        //kollar vad man har för lista som innehåller något, det som inte innehåller 0 körs ens display-metod som hämtas från display.js
        if (sortedPersonResults.length > 0) {
            displayPerson(sortedPersonResults, container);
            console.log("Visar personer");
        } else if (sortedMovieResults.length > 0) {
            displayMovies(sortedMovieResults, container);
            console.log("Visar filmer");
        } else {
            container.innerHTML = "<p>Inga resultat hittades.</p>";
            console.log("Inga resultat");
        }
    }