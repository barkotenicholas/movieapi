$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        e.preventDefault();
        let searchtext = $('#searchText').val();
        getMovies(searchtext);
    });
});


function getMovies(searchtext) {
    axios.get('http://www.omdbapi.com/?apikey=1847b41e&s=' + searchtext)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            console.log(movies)
            $.each(movies, (i, data) => {
                output += `
                    <div class= "col-md-3 mt-5">
                        <div class = "well text-center">
                            <img class="img-fluid" src="${data.Poster}"">
                            <h5>${data.Title} </h5>
                            <a class="btn btn-primary" href="#" onclick="movieSelected('${data.imdbID}')" > Movie details</a>
                        </div>
                    </div>
                `;
            });
            $("#movies").html(output);
        })
        .catch((err) => {
            console.log("Error " + err)
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false;
}

function getMovie() {
    let movieid = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?apikey=1847b41e&i=' + movieid)
        .then((response) => {
            let data = response.data;
            let output ;
                output += `
                <div class="row">
                <div class="col-md-4">
                  <img src="${data.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                  <h2>${data.Title}</h2>
                  <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${data.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${data.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${data.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${data.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${data.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${data.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${data.Actors}</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="well">
                  <h3>Plot</h3>
                  ${data.Plot}
                  <hr>
                  <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                  <a href="index.html" class="btn btn-default">Go Back To Search</a>
                </div>
              </div>
            `;
            
            $("#movie").html(output);
        })
        .catch((err) => {
            console.log("Error " + err)
        });
}