const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const imageNotFoundUrl = "https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg";

// Display för kända personer
export function displayPerson(persons, container) {
    container.innerHTML = ""; //Tömmer innehållet innan det fylls på med ny info

    //för varje person i listan persons så skapas en div klass i HTML, lägger till class, lägger till nödvändiga p-taggar i HTML
    persons.forEach((person) => {
        const personCard = document.createElement("div");
        personCard.classList.add("person-card");

        //Hämtar bild från profile_path från API:n
        const imageUrl = person.profile_path
            ? `${imageBaseUrl}${person.profile_path}`
            : imageNotFoundUrl; //om inte bild finns, ta imageNotFound bilden som är ref högst upp

            //för allt personen är känd för skapa p-tagg och skriv om det är film eller serie
        let knownForHTML = "";
        person.known_for.forEach((item) => {
            if (item.media_type === "movie") {
                knownForHTML += `<p>Film: ${item.title || item.name}</p>`;
            } else if (item.media_type === "tv") {
                knownForHTML += `<p>Serie: ${item.name}</p>`;
            }
        });

        //lägger till HTML i personCard div:en
        personCard.innerHTML = `
            <img src="${imageUrl}" alt="${person.name}">
            <div class="info">
                <h3>${person.name}</h3>
                <p>Popularitet: ${person.popularity}</p>
                <p>Känd för: ${person.known_for_department}</p>
                <p>Tv-serier/filmer:</p>
                ${knownForHTML}
            </div>
        `;
        //Gör den synlig i container
        container.appendChild(personCard);
    });
}

// Display för filmer, gör liknande som displayPerson
export function displayMovies(movies, container) {
    container.innerHTML = ""; //Tömmer innehållet innan det fylls på med ny info

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const imageUrl = movie.poster_path
            ? `${imageBaseUrl}${movie.poster_path}`
            : imageNotFoundUrl;

        movieCard.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}" />
            <div class="info">
                <h3>${movie.title}</h3>
                <p>Släppt: ${movie.release_date || 'Okänt datum'}</p>
                <p>Score: ${movie.vote_average}</p>
                <p>Beskrivning: ${movie.overview}</p>
            </div>
        `;

        container.appendChild(movieCard);
    });
}
