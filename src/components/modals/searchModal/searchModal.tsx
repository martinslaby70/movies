import React, {useContext, useEffect, useState} from 'react'

import Modal from 'react-bootstrap/Modal'
import Footer from './footer'
import Body from './body'

import Axios from 'axios'
import KEY from '../../../Keys'
import Movie from './../../../interfaces/Movie'

import 'bootstrap/dist/css/bootstrap.min.css';
import './../../../scss/searchModal.scss';
import { ModalContext } from '../../../contexts/modalContext'

interface props {
  modalSearchString: string,
  hide: () => void,
  isVisible: boolean,
  inputRef: React.MutableRefObject<HTMLInputElement | null> 
}
const MovieModal = ({modalSearchString, isVisible, hide, inputRef}: props) => {
    
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalMovieResults, setTotalMovieResults] = useState<number>(0);
    const {setMovieId} = useContext(ModalContext)!;
    
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