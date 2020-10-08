import React, {useEffect, useRef, useState} from 'react';
import Navbar from './components/navbar';
import Searchfield from './components/seachfield';
import Footer from './components/footer';

import {MovieContexProvider} from './contexts/movieContext';
import {ModalContexProvider} from './contexts/modalContext';

import MovieModal from './components/modals/movieModal/movieModal';
import SearchModal from './components/modals/searchModal/searchModal';
import MovieList from './components/movieList';





const App = () => {

  //search modal setup
  const [isVisible, setVisibility] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const inputRef = useRef(null);

  const hide = () => {
    setSearchString('');
    setVisibility(false);
  }
  const show = () => setVisibility(true);

  useEffect(() => {
    if (searchString !== '')
      show();
  },[searchString])


  return (
    <div className="App">
     

      <MovieContexProvider>    
        <ModalContexProvider>    
          <div className="push">

            <Navbar />
            
            <Searchfield modalSearchString={setSearchString} inputRef={inputRef}/>
            <MovieList  />

            <MovieModal  inputRef={inputRef} />
            <SearchModal modalSearchString={searchString} hide={hide} isVisible={isVisible} inputRef={inputRef}/>

          </div>
        
          <Footer />

        </ModalContexProvider>
      </MovieContexProvider>

      
    </div>
  );
}

export default App;
