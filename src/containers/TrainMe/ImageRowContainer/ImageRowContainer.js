import React, { useState, useEffect } from 'react';

import './ImageRowContainer.css';
import ImageRow from '../ImageRow/ImageRow';
import Button from '../../../components/UI/Button/Button'

const ImageRowContainer = (props) => {

    return(
        <div className="ImageRowContainer">    
            <div className="ImageRowDisplay">
                {props.items.map((item, index) => (
                    <ImageRow 
                        key={index} 
                        file={item}
                        remove={() => props.remove(index)}
                        viewClick={() => props.changeIsView(index)} />))}
            </div>  
                <Button 
                    clicked={props.removeAll} 
                    disabled={props.buttonDisabled}>Remove all</Button>
        </div>
    )

}

export default ImageRowContainer