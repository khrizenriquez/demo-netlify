'use strict'

//  -------------------- Variable definitions
//  width 500
const imagePath = 'https://image.tmdb.org/t/p/w500/'

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

    let itemImage = '', 
        itemTitle = '',
        itemAvg = 0, 
        itemTotalVotes = 0

    function movieImage (imageSrc, imageAlt) {
        return  `<div class='image-container'>
                    <img src="${ imagePath + imageSrc }" alt="${ imageAlt }" title="${ imageAlt }" />
                </div>`
    }
    function movieTitle (imageSrc, imageAlt) {
        return  `<div class='image-container'>
                    <img src="${ imagePath + imageSrc }" alt="${ imageAlt }" title="${ imageAlt }" />
                </div>`
    }

    let rawContent = ''
    movieData.forEach((element, index) => {
        console.log(element)
        rawContent +=   `<div class="list-item">
                            ${ movieImage(element.poster_path, element.title) }
                            <div class='items-container'>
                                <h5>Vote avg / Total vote</h5>
                                <h3>${ element.title }</h3>
                            </div>
                        </div>`
    })

    //  Filling the main container with the movies items
    itemContainer.innerHTML = rawContent
}

//  -------------------- Init
loadMovieS()