'use strict'

//  -------------------- Variable definitions
//  width 500
const imagePath = 'https://image.tmdb.org/t/p/w500/'
let starProperties = [{
    "rating":"0", "maxRating":"5", "minRating":"0.5", "readOnly":"yes", "starImage":"./img/star.png", "emptyStarImage":"./img/starbackground.png", "starSize":"16", "step":"0.5"
}];

//  -------------------- Functions definitions
const loadMovieS = () => {
    const fetchMovie = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=42431c3f9638f4b0885de2c95c89be4c')
        
        const movies = await response.json()
        return movies
    }
    fetchMovie().then(movies => {
        return fillMovieSection(movies.results)
    })
    fetchMovie().catch(error => console.log(error))
}
const fillMovieSection = (movieData) => {
    console.log(movieData)
    const itemContainer = document.querySelector('#main-container')

    //  Cleaning up the main container
    itemContainer.innerHTML = ''

    function movieImage (imageSrc, backImageSrc, imageAlt, description) {
        return `<div class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front image-container">
                            <img src="${ imagePath + imageSrc }" alt="${ imageAlt }" title="${ imageAlt }" />
                        </div>
                        <div class="flip-box-back" style='background-image:url(${ imagePath + backImageSrc }); background-size: cover; background-position: center center;'>
                            <div>
                                <h2>${ imageAlt }</h2>
                                <p>${ description }</p>
                            </div>
                        </div>
                    </div>
                </div>`
    }

    function starContent (id) {
        rateSystem(id, starProperties, function(rating, ratingTargetElement){  ratingTargetElement.parentElement.parentElement.getElementsByClassName("ratingHolder")[0].innerHTML = rating; })

        //return `<h5>${ starHTML }</h5>`
    }
    function movieContainer (content) {
        let className = "ratingSystem-" + content.id
        return  ` <div class='items-container'>
                    <div><div class="starRatingContainer"><div class="${ className }"></div></div><div class="ratingHolder"></div></div>
                    <h5>${ content.vote_count } votos</h5>
                    <h3>${ content.title }</h3>
                </div>`
    }

    let rawContent = ''
    movieData.forEach((element, index) => {
        rawContent +=   `<div class="list-item" data-move-id='${ element.id }'>
                            ${ movieImage(element.poster_path, 
                                element.backdrop_path, 
                                element.title, 
                                element.overview) }
                            ${ movieContainer(element) }
                        </div>`
    })

    //  Filling the main container with the movies items
    itemContainer.innerHTML = rawContent

    //  Stars DOM element needs to be created, then I can place the stars in the container
    movieData.forEach((element, index) => {
        let className = "ratingSystem-" + element.id
        starProperties[0].rating = element.vote_average / 2

        starContent(className)
    })
}

//  -------------------- Init
loadMovieS()