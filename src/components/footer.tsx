import React, { useContext } from 'react';
import { MovieContext } from '../contexts/movieContext';

const Footer = () => {

    const dt = new Date();
    const currentYear = dt.getFullYear();
    
    const {removeMovie} = useContext(MovieContext)!;

    return(
        <footer className="footer">         
            <a href="https://martinslaby.cz/" className="link">back to portfolio</a>
            <p>Martin Slabý &copy; 2020-{currentYear}</p>
            <p className="link" onClick={() => removeMovie('')}>clear whole list</p>
        </footer>
    )
}

export default Footer;