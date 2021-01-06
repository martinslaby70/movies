import React, {createContext, useState} from 'react'
import movieDescription from '../interfaces/movieDescription';
import MovieDescription from '../interfaces/movieDescription'


interface MovieContextType {
    movies: MovieDescription[],
    addMovie: (movieToAdd: MovieDescription) => void,
    removeMovie: (movieIDtoRemove: string) => void;
}

export const MovieContext = createContext<MovieContextType | null>(null);



interface props {
    children: React.ReactNode
}
export const MovieContexProvider = ({children}: props) => {
    
    const defaultValue = () => {
        const values: movieDescription[] = [];
        let keys = Object.keys(localStorage);
        let i = keys.length;

        let imdbId_regexMask = /ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/;
        while (i--) {
            
            if (imdbId_regexMask.test(keys[i]))
            {
                let movie = localStorage.getItem(keys[i]);
                values.push(JSON.parse(movie!))
            }
        }

        return values;
    } 

    const [movies, setMovies] = useState<MovieDescription[]>(defaultValue);


    const addMovie = (movieToAdd: MovieDescription) => {
        localStorage.setItem(movieToAdd.imdbID, JSON.stringify(movieToAdd));
        setMovies([...movies, movieToAdd]);
    }
    

    const removeMovie = (movieToRemove: string) => {
        if (movieToRemove === '')        
        {
            let keys = Object.keys(localStorage);
            let i = keys.length;
            while (i--)
                localStorage.removeItem(keys[i]);
            setMovies([]);
        }   
        else
        {
            localStorage.removeItem(movieToRemove);
            setMovies(movies.filter(movie => movie.imdbID !== movieToRemove));
        }
    }

    
    return(
        <MovieContext.Provider value={{movies, addMovie, removeMovie}}>
            {children}
        </MovieContext.Provider>
    );

}


