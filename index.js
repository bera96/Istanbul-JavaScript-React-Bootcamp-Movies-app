
// Api url

api_url="https://api.themoviedb.org/3/discover/movie?api_key=2f16f7c77222b1bb8ce2253e8999bf77&sort_by=popularity.desc"

const container=document.querySelector(".container")
const IMAGE_URL="https://image.tmdb.org/t/p/w500"

const searchBar=document.querySelector(".movie-search")

let moviesList=[]

searchBar.addEventListener("keyup",(e)=>{

    const searchValue=e.target.value
    
    
    const filteredMovies=moviesList.results.filter((titles)=>{
        
        return(
            
            titles.title.includes(searchValue)
            
        )
    })


    displayMovies(filteredMovies)

})





// fetch

const loadMovies = async ()=>{
    
    const res = await fetch(api_url)
    moviesList= await res.json()
    displayMovies(moviesList.results)
    
}

// getting all the values and returning as HTML 

const displayMovies =  (movies)=>{

    const htmlString = movies
    .map((movie)=>{

        // I used slice for only getting release year
        let releaseDate=movie.release_date.slice(0,4)
        
        
        return `<div class="movie-container">
                    <a href="${IMAGE_URL+movie.poster_path}"><img class="movie-img" src="${IMAGE_URL+movie.poster_path}"></a> 
                    <div class="movie-container-bottom">
                    <div class="movie-flex">
                        <h2 class="movie-title">${movie.title}</h2>
                        <div class="rating">
                        <span class="movie-vote">${movie.vote_average}</span>
                        </div>
                    </div>
                    <p class="release-date">${releaseDate}</p>
                    </div>
                </div>`
})
.join("")   // This join for get rid of commas
    
    container.innerHTML=htmlString
}
loadMovies().then((response)=>{
    const voteColor=document.querySelectorAll(".movie-vote")
    voteColor.forEach((element)=>{
    if(element.textContent>7){
        element.style.color="green"
        }
    else if(element.textContent>5){
        element.style.color="blue"
    }
    else 
            element.style.color="red"})})
            .catch((rejected)=>{
    alert("Başarısız")})




