import React from 'react'
import movieDescription from '../../../interfaces/movieDescription' 
import unknowMoviePoster from './../../../imgs/uknownFilm.jpg';

interface props {
    movie: movieDescription
}
const Body = ({movie}: props) => {
    const Poster = movie.Poster === 'N/A' ? unknowMoviePoster : movie.Poster
    return movie.Title ? (      
    <div>
        <div className="content-left">
            <img src={Poster} alt="Movie Poster"/>
        </div>
        <div className="content-right">
            <h2>{movie.Title}</h2>
            <ul>
                <li>Rating: <span>{movie.imdbRating}</span></li>
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
    ):(<div></div>);
}

export default Body;