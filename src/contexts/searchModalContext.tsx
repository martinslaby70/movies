import React, {createContext, useEffect, useState} from 'react'


interface ModalContextType {
    isVisible: boolean,
    show: () => void,
    hide: () => void,
    modalSearchString: string,
    setModalSearchString: (id: string) => void
}

export const SearchModalContext = createContext<ModalContextType | null>(null);


interface props {
    children: React.ReactNode
}
export const SearchModalContexProvider = ({children}: props) => {
    
   //search modal setup
    const [isVisible, setVisibility] = useState<boolean>(false);
    const [modalSearchString, setModalSearchString] = useState<string>('');
    

    const hide = () => {
        setModalSearchString('');
        setVisibility(false); 
    }
    const show = () => setVisibility(true);

    useEffect(() => {
        if (modalSearchString !== '')
        show();
    },[modalSearchString]);

    const values = {
        isVisible,
        modalSearchString,
        setModalSearchString,
        show,
        hide,
    }

    return(
        <SearchModalContext.Provider value={values}>
            {children}
        </SearchModalContext.Provider>
    );

}


