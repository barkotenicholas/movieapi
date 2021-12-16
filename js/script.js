$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        e.preventDefault();
        let searchtext = $('#searchText').val();
        getMovies(searchtext);
    });
});


function getMovies(searchtext) {
    axios.get('http://www.omdbapi.com/?apikey=1847b41e&s='+searchtext)
        .then((response) => {
            let movies = response.data.Search;
            let output ='';
            console.log(movies)
            $.each(movies,(i,data)=>{
                output+=`
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