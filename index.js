let id;

let container = document.getElementById("container");

async function fetchAPI() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfda6d0dcee22c451665631a25208105&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=10&with_watch_monetization_types=flatrate')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayData(data.results);
        })
        .catch(function (error) {
            console.log(error);
        })
}
fetchAPI();
async function fetchAPILow() {
    try {
        let response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfda6d0dcee22c451665631a25208105&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=10&with_watch_monetization_types=flatrate')
        let data = await response.json();
        sortByLow(data.results);
    } catch (error) {
        console.log(error);
    }
}
async function fetchAPIHigh() {
    try {
        let response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=dfda6d0dcee22c451665631a25208105&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=10&with_watch_monetization_types=flatrate')
        let data = await response.json();
        sortByHigh(data.results);
    } catch (error) {
        console.log(error);
    }
}

function sortByLow(data) {
    let sort = data.sort(function (a, b) {
        return a.vote_average - b.vote_average;
    })
    displayData(sort);
}

function sortByHigh(data) {
    let sort = data.sort(function (a, b) {
        return b.vote_average - a.vote_average;
    })
    displayData(sort);
}
function displayData(data) {
    container.innerText = null;
    data.map(function (el) {

        let div = document.createElement("div");
        div.setAttribute("class", "infoDiv");

        let image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/original${el.poster_path}`;
        image.setAttribute("class", "movieImage");

        let title = document.createElement("h3");
        title.innerText = `${el.original_title} (${el.release_date})`;

        let rating = document.createElement("p");
        rating.innerText = `Rating : ${el.vote_average}`;

        let vote = document.createElement("p");
        vote.innerText = ` Vote : ${el.vote_count}`;

        // let overview = document.createElement("span");
        // overview.innerText = el.overview;

        div.append(image, title, rating, vote);

        container.append(div);
    })
}
// -------------------------------------------------------------------------------->
// Debouncing part;

async function fetchData(query) {

    try {
        let url = `https://www.omdbapi.com/?s=${query}&apikey=d806bd70`;
        let response = await fetch(url);
        let data = await response.json();
        return data.Search;
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}
async function main() {
    let value = document.getElementById("searchMovei").value;
    let response = fetchData(value);
    let data = await response;
    console.log(data);
    appendData(data)

}
function appendData(data) {

    let searchBox = document.querySelector("#searchBox");

    searchBox.innerText = null;

    data.map(function (el) {

        let div = document.createElement('div');
        div.setAttribute("class", "searchBoxdiv")

        let image = document.createElement("img");
        image.src = el.Poster;
        image.setAttribute("class", "searchImg")

        let name = document.createElement('h3');
        name.innerText = el.Title;
        // name.setAttribute("class","searchMoveName")
        name.style.marginTop = "10px";

        let type = document.createElement("p");
        type.innerText = `Type : ${el.Type} `;

        let releaseDate = document.createElement("p");
        releaseDate.innerText = `Release Year: ${el.Year}`;

        let infoSearchdiv = document.createElement("div");
        infoSearchdiv.setAttribute("class", "nameYear")

        infoSearchdiv.append(name, type, releaseDate)

        div.append(image, infoSearchdiv)

        searchBox.append(div);
    })
}
function DebounceFunction(functionMain, delay) {
    if (id) {
        clearInterval(id);
    }
    id = setTimeout(function () {
        functionMain();
    }, delay);
}

// -----------------------------------------------------------------------------------------------
function addDataStorage() {
    alert("Under Maintenance!")
}
