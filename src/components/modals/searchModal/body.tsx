import React from 'react'
import Movie from '../../../interfaces/Movie' 

import unknowMoviePoster from './../../../imgs/uknownFilm.jpg'
import {v4 as uuid} from 'uuid'

interface props {
    movies: Movie[],
    handleClick: (movieId: string) => void
}
const Body = ({movies, handleClick}: props) => {

    const ret = movies.map(movie => {   
        return(
            <div className="container" onClick={() => handleClick(movie.imdbID)} key={uuid()}>
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