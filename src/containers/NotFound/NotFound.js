import React from 'react'

import './NotFound.css';

const NotFound = () => {
    const goBack = () => {
        window.history.back();
    }

    return(
        <div className="NotFound" onClick={goBack}>
            404 Not Found!
            Click to return.
        </div> 
    );
}

export default NotFound;