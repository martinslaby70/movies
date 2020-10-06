import React, { useContext, useState, useEffect } from 'react'
import { MovieContext } from '../../../contexts/movieContext'
import movieDescription from '../../../interfaces/movieDescription'
import Button from 'react-bootstrap/Button';
import { ModalContext } from '../../../contexts/modalContext';

interface props {
    movie: movieDescription,
    close: () => void
}
const Footer = ({movie, close}: props): JSX.Element => {

    const {isVisible} = useContext(ModalContext)!;
    const {movies, addMovie, removeMovie} = useContext(MovieContext)!;

    const [isAdded, toggle] = useState<boolean>(false);
    
    useEffect(() => {
        toggle(false);
        movies.forEach(item => {
            if(item.imdbID === movie.imdbID)
                toggle(true);
        })
    },[movies, isVisible]);
    
    const buttons = isAdded ? (
        <div className="movieModalButtons">
            <Button onClick={() => removeMovie(movie.imdbID)}>Remove from my list</Button>
            <Button href={`https://www.google.com/search?q=where+to+watch+${movie.Title}+online`} target="_blank">Watch <span>{movie.Title}</span> online</Button>
            <Button onClick={close}>close</Button>
        </div>
    ):(
        <div className="movieModalButtons">
            <Button onClick={() => addMovie(movie) } >Add to my List</Button>
            <Button href={`https://www.google.com/search?q=where+to+watch+${movie.Title}+online`} target="_blank">Watch <span>{movie.Title}</span> online</Button>
            <Button onClick={close}>close</Button>
        </div>  
    );
    
    return movie.Poster ? (
        <div>
            {buttons}
        </div>
    ):(<div />)
}

export default Footer;