import React, {useContext, useEffect, useState} from 'react'

import Modal from 'react-bootstrap/Modal'
import Footer from './footer'
import Body from './body'

import Axios from 'axios'
import KEY from '../../../Keys'
import Movie from './../../../interfaces/Movie'

import 'bootstrap/dist/css/bootstrap.min.css';
import './../../../scss/searchModal.scss';
import { MovieModalContext } from '../../../contexts/movieModalContext'
import { SearchModalContext } from '../../../contexts/searchModalContext'

interface props {
  inputRef: React.MutableRefObject<HTMLInputElement | null> 
}
const MovieModal = ({inputRef}: props) => {
    
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalMovieResults, setTotalMovieResults] = useState<number>(0);

    //contexts
    const {setMovieId} = useContext(MovieModalContext)!;
    const {modalSearchString, isVisible, hide} = useContext(SearchModalContext)!;
    
    useEffect(() => {     
    
        Axios.get(`https://omdbapi.com/?apikey=${KEY}&s=${modalSearchString}&page=${page.toString()}`)
        .then(res => {
          setMovies(res.data.Search);     
          setTotalMovieResults(res.data.totalResults);             
        });   
     
    },[modalSearchString, page]);
   
    const handleHide = () => {
      setPage(1);
      setTotalMovieResults(0);
      hide();
      if (inputRef.current)
        inputRef.current.focus();
    }

    const handleMovieClick = (movieId: string) => {
      handleHide();
      setMovieId(movieId);
    }

    return movies ? (
        <Modal
        show={isVisible}
        onHide={handleHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
      >       
        <Modal.Body>
          <Body movies={movies} handleClick={handleMovieClick}/>     
        </Modal.Body>
        
        <Modal.Footer>          
          <Footer page={page} totalResults={totalMovieResults} setPage={setPage} close={handleHide}/>
        </Modal.Footer>
      </Modal>
    ):(<div />)
}

export default MovieModal;