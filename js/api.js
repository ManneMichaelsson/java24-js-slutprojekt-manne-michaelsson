const API_KEY = "0116dcb4747271590a57fda4bfdb5623";
const baseUrl = "https://api.themoviedb.org/3";

//Hämtar personer från API:et och retunerar resultatet 
export async function fetchSearchPerson(searchTerm) {
    const url = `${baseUrl}/search/person?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchTerm)}&page=1`; //skapar en URL för sökningen som användaren har fyllt i. 

    try {
        const response = await fetch(url); //hämtar från API:n

        //kontrollerar så att den kommunicerar rätt med API
        if (!response.ok) {
            throw new Error(`API-fel: ${response.status}`);
        }
        //Väntar på att svaret från server har konverterats till json-format och sparar det i en variabel
        const data = await response.json();
        return data.results; //returnerar resultatet från data
    } catch (error) {
        console.error("Fel vid hämtning av personer", error);
        return [];
    }
}

//Hämtar filmer från API:et, fungerar som fetchSearchPerson
export async function fetchSearchMovie(searchTerm) {
    const url = `${baseUrl}/search/movie?api_key=${API_KEY}&language=sv-SE&query=${encodeURIComponent(searchTerm)}&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched Movie Data:", data); // Debug output
        return data.results;
    } catch (error) {
        console.error("Fel vid hämtning av filmer", error);
        return [];
    }
}
