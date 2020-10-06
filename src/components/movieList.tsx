import React, {useContext} from 'react'
import { MovieContext } from '../contexts/movieContext'
import { ModalContext } from '../contexts/modalContext'
import {v4 as uuid} from 'uuid';

import unknownMoviePoster from '../imgs/uknownFilm.jpg'

import './../scss/movieList.scss'

const MovieList = () => {
    const {movies} = useContext(MovieContext)!;
    const {setMovieId} = useContext(ModalContext)!;

    const myList = movies.map(movie => {
        let poster = movie.Poster !== 'N/A' ? (movie.Poster):(unknownMoviePoster);
       
        return(     
            <div className="imageBox" onClick={() => setMovieId(movie.imdbID)} key={uuid()}>               
                <img src={poster} alt="" />
                <div className="middle">
                    <h4>{movie.Title}</h4>
                    <p>{movie.Genre}</p>
                </div>
            </div>             
        )
    })
   
    return movies.length !== 0 ? (
        <div className="movieList">
            <h3>My movies</h3>
            <div>
                {myList}
            </div>
        </div>
    ): (
        <div className="movieList">
            <h3>My movies</h3>
            <p>find your favorite movies by searching fot them in a searchbar</p>
        </div>
    )   
}

export default MovieList;