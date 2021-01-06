import React, {useRef} from 'react';

//contexts
import {MovieContexProvider} from './contexts/movieContext';
import {MovieModalContexProvider} from './contexts/movieModalContext';
import {SearchModalContexProvider} from './contexts/searchModalContext';

//components
import MovieModal from './components/modals/movieModal/movieModal';
import SearchModal from './components/modals/searchModal/searchModal';
import MovieList from './components/movieList';
import Navbar from './components/navbar';
import Searchfield from './components/seachfield';
import Footer from './components/footer';


const App = () => {
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
      <MovieContexProvider>    
        <MovieModalContexProvider>   
          <SearchModalContexProvider>
             
            <Navbar />

            <Searchfield inputRef={inputRef}/>
            <MovieList  />

            <MovieModal inputRef={inputRef} />
            <SearchModal inputRef={inputRef} /> 

            <Footer />

          </SearchModalContexProvider>
        </MovieModalContexProvider>
      </MovieContexProvider>
  );
}

export default App;
