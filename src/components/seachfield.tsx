import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import movieAPIKEY from '../Keys';
import Movie from '../interfaces/Movie';

//compoentnts
import FilmInsinuator from './filmInsinuator';

//libaries
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSearchMinus } from '@fortawesome/free-solid-svg-icons'

//scss
import './../scss/searchfield.scss'


interface props {
    modalSearchString: (movieId: string) => void,
    inputRef: React.MutableRefObject<HTMLInputElement | null> 
}
const Searchfield = ({modalSearchString, inputRef}: props) => {
    

    const [searchInsinuator, setSearchInsinuator] = useState<Movie[]>([]);    
    const [searchString, setSearchString] = useState('');
    const [movieType, setMovieType] = useState('');

    const [focus, setFocus] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChange = (movieType: string) => setMovieType(movieType);   
    
    useEffect(() => {
        if (searchString.length >= 3)
        {
            setLoading(true);
            Axios.get(`https://omdbapi.com/?apikey=${movieAPIKEY}&s=${searchString}&type=${movieType}`)
            .then(res => { 
                if(res.data.Search)                
                    setSearchInsinuator(res.data.Search);
                else
                    console.log(res); 
            })
            .catch(err => console.log(err));        
            setLoading(false);
        } 
        else 
            setSearchInsinuator([]);  

    },[searchString, movieType]);

   
    const handleSearchButton = () => {
        if (searchString.length >= 3)
            modalSearchString(searchString);
    }   

    const handleBlur = () => {
        setTimeout(() => {
            if (document.activeElement === document.body)
                setFocus(false);
        }, 100)
    } 

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && searchString.length >= 3)
            modalSearchString(searchString);
    }

    
    
    return(
        <div className="searchfield" onFocus={() => setFocus(true)} onBlur={handleBlur}>
            <div className='searchbar'>
                
                <DropdownButton id="dropdown-basic-button" title={movieType === '' ? 'All' : movieType.charAt(0).toUpperCase() + movieType.slice(1)} >
                    <Dropdown.Item onClick={() => handleChange('')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange('movie')}>Movie</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange('series')}>Series</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange('episode')}>Episode</Dropdown.Item>
                </DropdownButton>

                <input 
                    autoFocus={true} 
                    ref={inputRef} 
                    type="text" 
                    placeholder="Search for films" 
                    onChange={ (e) => setSearchString(e.target.value)} 
                    onKeyPress={ (e) => handleKeyPress(e)}
                />

                <button type="submit" onClick={() => handleSearchButton()}>
                    <FontAwesomeIcon icon={searchString.length >= 3 ? faSearch : faSearchMinus} />
                </button>

            </div>

           { focus ? <FilmInsinuator movies={searchInsinuator} loading={loading} /> : null}
            
            
        </div> 
        
    );
}


export default Searchfield;