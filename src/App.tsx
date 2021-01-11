import React, {useRef} from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

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
            
            <div className="wrapper">
              <Navbar />

              <Searchfield inputRef={inputRef}/>

              <LazyLoadComponent> 
                <MovieList  />
              </LazyLoadComponent>
              
              <MovieModal inputRef={inputRef} />
              <SearchModal inputRef={inputRef} /> 
            </div>
           
            <Footer />

          </SearchModalContexProvider>
        </MovieModalContexProvider>
      </MovieContexProvider>
  );
}

export default App;
