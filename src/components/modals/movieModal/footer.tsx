import React, { useContext, useState, useEffect } from 'react'
import { MovieContext } from '../../../contexts/movieContext'
import movieDescription from '../../../interfaces/movieDescription'
import Button from 'react-bootstrap/Button';
import { MovieModalContext } from '../../../contexts/movieModalContext';

interface props {
    movie: movieDescription,
    close: () => void
}
const Footer = ({movie, close}: props): JSX.Element | null => {

    const {isVisible} = useContext(MovieModalContext)!;
    const {movies, addMovie, removeMovie} = useContext(MovieContext)!;

    const [isAdded, toggle] = useState<boolean>(false);
    
    useEffect(() => {
        toggle(false);
        movies.forEach(item => {
            if(item.imdbID === movie.imdbID)
                toggle(true);
        })
    },[movies, isVisible, movie.imdbID]);
    
    const addButton = isAdded ? (      
            <Button onClick={() => removeMovie(movie.imdbID)}>Remove from my list</Button>
    ):(
            <Button onClick={() => addMovie(movie) } >Add to my List</Button>
    );
    
    return movie.Poster ? (
        <div className="movieModalButtons">
            {addButton}
            <Button href={`https://www.google.com/search?q=where+to+watch+${movie.Title}+online`} target="_blank">Watch <span>{movie.Title}</span> online</Button>
            <Button onClick={close}>close</Button>
        </div>
    ):null
}

export default Footer;