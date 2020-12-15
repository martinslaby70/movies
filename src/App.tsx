import React, {useEffect, useRef, useState} from 'react';

//contexts
import {MovieContexProvider} from './contexts/movieContext';
import {ModalContexProvider} from './contexts/modalContext';

//components
import MovieModal from './components/modals/movieModal/movieModal';
import SearchModal from './components/modals/searchModal/searchModal';
import MovieList from './components/movieList';
import Navbar from './components/navbar';
import Searchfield from './components/seachfield';
import Footer from './components/footer';




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
      <MovieContexProvider>    
        <ModalContexProvider>    

          

          <div className="push">
            <Navbar />
            <Searchfield modalSearchString={setSearchString} inputRef={inputRef}/>
            <MovieList  />
          </div>


          <MovieModal  
            inputRef={inputRef} 
          />

          <SearchModal 
            modalSearchString={searchString} 
            hide={hide} 
            isVisible={isVisible} 
            inputRef={inputRef}
          />

          <Footer />

        </ModalContexProvider>
      </MovieContexProvider>
  );
}

export default App;
