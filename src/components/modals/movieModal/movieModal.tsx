import React, {useContext, useEffect, useState} from 'react'
import Axios from 'axios'
import KEY from '../../../Keys'
import movieDescription from '../../../interfaces/movieDescription'
import { ModalContext } from '../../../contexts/modalContext'

//components
import Footer from './footer'
import Body from './body'

//libaries
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
//scss
import './../../../scss/movieModal.scss';

interface props {
  inputRef: React.MutableRefObject<HTMLInputElement | null> 
}
const MovieModal = ({inputRef}: props) => {
    
    const [movieDescription, setMovieDescription] = useState<movieDescription | null>(null);
    const {movieId,setMovieId, hide, isVisible} = useContext(ModalContext)!;
    
    useEffect(() => {     
     if(Object.keys(localStorage).includes(movieId))
        setMovieDescription(JSON.parse(localStorage.getItem(movieId)!));      
     else 
        Axios.get(`https://omdbapi.com/?apikey=${KEY}&i=${movieId}&plot=full`)
        .then(res => {
          setMovieDescription(res.data);            
        });   
     
    },[movieId]);


    const closeModal = () => {
      setMovieDescription(null);
      setMovieId('');
      hide();
      if (inputRef.current)
        inputRef.current.focus();
    } 
    
    return movieDescription ? (
        <Modal
        show={isVisible}
        onHide={() => closeModal()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
      >       
        <Modal.Body>
          <Body movie={movieDescription} />     
        </Modal.Body>
        
        <Modal.Footer>          
          <Footer movie={movieDescription} close={closeModal}/>
        </Modal.Footer>
      </Modal>
    ):(<div />)
}

export default MovieModal;