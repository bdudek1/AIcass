import React from 'react';

import './ImageRowContainer.css';
import ImageRow from '../ImageRow/ImageRow';
import Button from '../../../components/UI/Button/Button'

const imageRowContainer = (props) => {
    return(
        <div className="ImageRowContainer">    
            <div className="ImageRowDisplay">
                {props.items.map((item, index) => (
                    <ImageRow 
                        key={index} 
                        item={item.name} 
                        isView={item.isView}
                        viewPrediction={item.viewPrediction}
                        click={() => props.clicked(index)}
                        viewClick={() => props.changeIsView(index)} />))}
            </div>  
                <Button 
                    clicked={props.removeAll} 
                    disabled={props.buttonDisabled}>Remove all</Button>
        </div>
    )

}

export default imageRowContainer