import React, {useContext, useState} from 'react'
import Movie from '../interfaces/Movie';
import unknownMoviePoster from '../imgs/uknownFilm.jpg'
import { MovieModalContext } from '../contexts/movieModalContext';
import { v4 as uuid } from 'uuid';


const numberOfSearchResults = 8;

interface props {
    movies: Movie[]
}
const FilmResult = ({movies}: props) => {

    const results = movies.slice(0, numberOfSearchResults).map(movie => <Film movie={movie}/>);
    
   
    return (
        <div className='insinuator'>
            {results}
        </div>
    )
}



interface movieProps{
    movie: Movie
}
const Film = ({movie}: movieProps) => {

    const {setMovieId} = useContext(MovieModalContext)!;

    return movie.Poster ? (
        <div className="insinuatorBar" onClick={() => setMovieId(movie.imdbID)} key={uuid()}>
            <img src={movie.Poster === "N/A" ? (unknownMoviePoster) : (movie.Poster)} alt={movie.Title + '- Poster'}/>
            <ul>
                <li>{movie.Title}</li>
                <li><span className="grey">({movie.Year})</span></li>
                <li>{movie.Type}</li>
            </ul>
        </div>
   ):(
    <div className="insinuatorBar" key={uuid()}>
        <img src={unknownMoviePoster} alt="Movie poster"/>
        <ul>
            <li>asd</li>
            <li><span className="grey">XXXX</span></li>
            <li>asdasd</li>
        </ul>
    </div>
   )
}

export default FilmResult;