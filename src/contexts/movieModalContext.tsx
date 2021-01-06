import React, {createContext, useEffect, useState} from 'react'


interface ModalContextType {
    isVisible: boolean,
    show: () => void,
    hide: () => void,
    movieId: string,
    setMovieId: (id: string) => void
}

export const MovieModalContext = createContext<ModalContextType | null>(null);


interface props {
    children: React.ReactNode
}
export const MovieModalContexProvider = ({children}: props) => {
    
   
    const [isVisible, setVisibility] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<string>('');

    const show = () => setVisibility(true);
    const hide = () => setVisibility(false);

    useEffect(() => {
        if(movieId !== '')
            show(); 
    },[movieId])

    const values = {
        isVisible,
        movieId,
        show,
        hide,
        setMovieId
    }

    return(
        <MovieModalContext.Provider value={values}>
            {children}
        </MovieModalContext.Provider>
    );

}


