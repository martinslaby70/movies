import React, {useContext} from 'react'

import Movie from '../interfaces/Movie';
import unknownMoviePoster from '../imgs/uknownFilm.jpg'
import { ModalContext } from '../contexts/modalContext';
import { v4 as uuid} from 'uuid';

const numberOfSearchResults = 8;
interface props {
    movies: Movie[],
}

const FilmResult = ({movies}: props) => {

    const {setMovieId} = useContext(ModalContext)!;

    const results = movies.slice(0, numberOfSearchResults).map(movie => {
        return(
            <div className="insinuatorBar" onClick={() => setMovieId(movie.imdbID)} key={uuid()}>
                <img src={movie.Poster === "N/A" ? (unknownMoviePoster) : (movie.Poster)} alt=""/>
                <ul>
                    <li>{movie.Title}</li>
                    <li><span className="grey">({movie.Year})</span></li>
                    <li>{movie.Type}</li>
                </ul>
            </div>
       );       
    });
   
   
    return (
        <div className='insinuator'>
            {results}
        </div>
    )
}

export default FilmResult;