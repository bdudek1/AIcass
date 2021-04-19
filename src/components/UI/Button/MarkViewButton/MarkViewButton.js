import React, {useEffect, useState} from 'react';
import ReactTooltip from 'react-tooltip';

import './MarkViewButton.css';

const MarkViewButton = (props) => {
    const [tooltip, setTooltip] = useState("");


    let attachedClasses = ["MarkViewButton", "AsNonView"];
    let buttonText = "NON VIEW"


    if (props.view) {
        attachedClasses = ["MarkViewButton", "AsView"];
        buttonText = "VIEW"
    }

    const click = (event) => {
        event.stopPropagation();
        props.clicked()
    }

    useEffect(() => {
        setTooltip(`AIcasso thinks the image is in ${(props.viewPrediction*100).toFixed(2)}% view, but the choice is yours!`)
    }, [props.viewPrediction])

    return(
    <button data-tip={tooltip}
            data-for={props.id}
            className={attachedClasses.join(' ')}
            onClick={click}>
            <div>
                {buttonText}
            </div>
            <ReactTooltip   className="Tooltip"
                            id={props.id}
                            backgroundColor="#33B7EE"
                            borderColor="#B637F1"
                            border="true"
                            style={{fontWieght:"400 !important"}} /> 
    </button>
    );
};

export default MarkViewButton;