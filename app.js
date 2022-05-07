'use strict'

const loadMovies = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=42431c3f9638f4b0885de2c95c89be4c')

        console.log(response)
        switch (response.status) {
            case 200:
                const data = await response.json()
                //console.log(data.results)
                data.results.forEach(item => {
                    console.log(item.title)
                });
                break
            case 401:
                console.error(response)
                break
            case 404:
                console.error(response)
                break
            default:
                console.log(response)
                break
        }
    } catch (error) {
        console.log(error)
    }
}
loadMovies()
