import React from 'react'
import Movie from '../../../interfaces/Movie' 

import unknowMoviePoster from './../../../imgs/uknownFilm.jpg'

interface props {
    movies: Movie[],
    handleClick: (movieId: string) => void
}
const Body = ({movies, handleClick}: props) => {
    console.log(movies);

    const ret = movies.map(movie => {   
        return(
            <div className="container" onClick={() => handleClick(movie.imdbID)}>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : unknowMoviePoster} alt=""/>
                <ul>
                    <li>{movie.Title}</li>
                    <li className="grey">{movie.Year}</li>
                    <li>{movie.Type}</li>
                </ul>
            </div>
        )
    })

    
    return (      
        <div className='body'>
            {ret}
        </div>
    )
}

export default Body;