import React, {useState, useEffect, useRef} from 'react';
import Axios from 'axios';

import FilmInsinuator from './filmInsinuator';
import KEY from '../Keys';
import Movie from '../interfaces/Movie';

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSearchMinus } from '@fortawesome/free-solid-svg-icons'

import './../scss/searchfield.scss'

interface props {
    modalSearchString: (movieId: string) => void
}
const Searchfield = ({modalSearchString}: props) => {
    

    const [searchInsinuator, setSearchInsinuator] = useState<Movie[]>([]);    
    const [searchString, setSearchString] = useState<string>('');
    const [movieType, setMovieType] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(true);
    
    const handleChange = (movieType: string) => setMovieType(movieType);
    
    
    
    useEffect(() => {
        if (searchString.length >= 3 && searchString[searchString.length - 1] !== ' ')
            Axios.get(`http://omdbapi.com/?apikey=${KEY}&s=${searchString}&type=${movieType}`)
            .then(res => { 
                if(res.data.Search)                
                    setSearchInsinuator(res.data.Search);
                else
                    console.log(res); 
            })
            .catch(err => console.log(err));      
             
        else if (searchString.length < 3)
            setSearchInsinuator([]);  

    },[searchString, movieType]);

    const handleSearchButton = () => {
        if (searchString.length >= 3)
            modalSearchString(searchString);
    }   
    const handleBlur = () => {
        setTimeout(() => {
            setFocus(false);
        }, 100)
    }; 

    return(
        <div className="searchfield" onFocus={() => setFocus(true)} onBlur={handleBlur}>
            <div className='searchbar'>
                
                <DropdownButton id="dropdown-basic-button" title={movieType === '' ? 'All' : movieType.charAt(0).toUpperCase() + movieType.slice(1)} >
                    <Dropdown.Item onClick={() => handleChange('')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange('movie')}>Movie</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange('series')}>Series</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange('episode')}>Episode</Dropdown.Item>
                </DropdownButton>

                <input type="text" placeholder="Search for films" onChange={ (event) => setSearchString(event.target.value)}/>
                <button type="submit" onClick={() => handleSearchButton()}><FontAwesomeIcon icon={searchString.length >= 3 ? faSearch : faSearchMinus} /></button>
            </div>

           { focus ? <FilmInsinuator movies={searchInsinuator}/> : null}
            
            
        </div>
        
    );
}


export default Searchfield;