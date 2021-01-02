import React from 'react'

const Loader = () => {

    return(
    <div className="preview">
        <div className="poster">
            <div />
        </div>
        <div className="description">
            <div />
            <ul className="previewShort">
                <li>Rating: <div /></li>
                <li>Release date: <div /></li>
                <li>Rated: <div /></li>
                <li>Genre: <div /></li>
                <li>Language: <div /></li>
                <li>Actors: <div /></li>             
            </ul>
            <p className="previewLong">Plot: <br/>
                <div /><br/>
                <div /><br/>
                <div /><br/>
                <div /><br/>
                <div /><br/>
                <div /><br/>
                <div /><br/>
            </p>
        </div>
    </div>
    )
}

export default Loader;