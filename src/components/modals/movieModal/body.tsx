import React, { useState, useEffect } from 'react'
import movieDescription from '../../../interfaces/movieDescription' 
import unknowMoviePoster from './../../../imgs/uknownFilm.jpg';
import Loader from './loader';

interface props {
    movie: movieDescription
}
const Body = ({movie}: props) => {

    const [loaded, setLoad] = useState(false);

    useEffect(() => {
        if (movie.Poster)
            setLoad(true);
        else
            setLoad(false);
    },[movie.Poster])    
    
    const Poster = movie.Poster === 'N/A' ? unknowMoviePoster : movie.Poster;

    return loaded ? (      
        <div>
            <div className="poster">
                <img src={Poster} alt="Movie Poster"/>
            </div>
            <div className="description">
                <h2>{movie.Title}</h2>
                <ul>
                    <li>Rating: <span>{movie.imdbRating} / 10</span></li>
                    <li>Release date: <span>{movie.Year}</span></li>
                    <li>Rated: <span>{movie.Rated}</span></li>
                    <li>Director: <span>{movie.Director}</span></li>
                    <li>Genre: <span>{movie.Genre}</span></li>
                    <li>Language: <span>{movie.Language}</span></li>
                    <li>Actors: <span>{movie.Actors}</span></li>            
                </ul>
                <p>Plot: <span>{movie.Plot}</span></p>
            </div>
        </div>
    ):(<Loader />);
}

export default Body;