function main() {

    const baseUrl = "https://api.themoviedb.org/3";
    const apiKey = "7b4a111dae6877683996f90a8ea25891";

    const getMovie = async (keySearch = "") => {
        
        try {
            let url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
            if(keySearch !== ""){
                url = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${keySearch}`;
            } 
            const response = await fetch(url);
            const responseJson = await response.json();
            if(responseJson.error) {
               showResponseMessage(responseJson.message);
            } else {
               renderAllShow(responseJson.results, "movie");
            }
        } catch(error) {
            showResponseMessage(error);
        }
    };

    const getTvShow = async (keySearch = "") => {
        
        try {
            let url = `${baseUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
            if(keySearch !== ""){
                url = `${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&page=1&query=${keySearch}`;
            } 
            const response = await fetch(url);
            const responseJson = await response.json();
            if(responseJson.error) {
               showResponseMessage(responseJson.message);
            } else {
               renderAllShow(responseJson.results, "tv");
            }
        } catch(error) {
            showResponseMessage(error);
        }
    };

    const renderAllShow = (books, shows) => {
        const listMovieElement = document.querySelector("#listShow");
        listMovieElement.innerHTML = "";

        books.forEach(show => {
            const name = (shows === "movie") ? show.title : show.name;
            if (show.poster_path === null) {
                listMovieElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <img src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg" class="card-img-top" alt="...">
                        <div class="card-body" style="height: 120px;">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text"><i class="fa fa-star-o"></i> <b>${show.vote_average}</b></p>
                        </div>
                    </div>
                </div>
                `;
            } else {
                listMovieElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <img src="https://image.tmdb.org/t/p/w342${show.poster_path}" class="card-img-top" alt="...">
                        <div class="card-body" style="height: 120px;">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text"><i class="fa fa-star-o"></i> <b>${show.vote_average}</b></p>
                        </div>
                    </div>
                </div>
                `;     
            }
        });
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        let searchKey =  "";

        const inputShow = document.querySelector("#inputState");
        const inputSearch = document.querySelector("#inputSearch");
        const buttonSearch = document.querySelector("#buttonSearch");

        buttonSearch.addEventListener("click", () => {
            const show =  inputShow.options[inputShow.selectedIndex].text;
            searchKey =  inputSearch.value;
            if(show === "Movie"){
                getMovie(searchKey);
            } else {
                getTvShow(searchKey);
            }
            
        });

        inputShow.addEventListener("change", () => {
            inputSearch.value = "";
            const show =  inputShow.options[inputShow.selectedIndex].text;
            if(show === "Movie"){
                getMovie("");
            } else {
                getTvShow("");
            }
        });

        getMovie(searchKey);
    });
}

export default main;