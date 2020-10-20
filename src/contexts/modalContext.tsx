import React, {createContext, useEffect, useState} from 'react'


interface ModalContextType {
    isVisible: boolean,
    show: () => void,
    hide: () => void,
    movieId: string,
    setMovieId: (id: string) => void
}

export const ModalContext = createContext<ModalContextType | null>(null);


interface Props {
    children: React.ReactNode
}
export const ModalContexProvider = ({children}: Props) => {
    
   
    const [isVisible, setVisibility] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<string>('');

    const show = () => setVisibility(true);
    const hide = () => setVisibility(false);

    useEffect(() => {
        if(movieId !== '')
            show(); 
    },[movieId])

    return(
        <ModalContext.Provider value={{isVisible, show, hide, movieId, setMovieId}}>
            {children}
        </ModalContext.Provider>
    );

}


