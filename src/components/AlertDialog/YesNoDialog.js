import React from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';

import './AlertDialog.css'
import '../../global_styles/styles.css'

const yesNoDialog = (props) => {
    return (
        <React.Fragment>
            <Backdrop
                show={props.open}
                clicked={props.closed}/>
            <div className="AlertDialog">
                <div className="TextStyle">{props.children}</div>
                <div style={{marginBottom:"-10px"}}>
                    <Button clicked={props.yesClicked ? props.yesClicked : props.closed}>
                        {props.yesButtonText ? props.buttonText : "Yes"}
                    </Button>
                    <Button clicked={props.noClicked ? props.noClicked : props.closed}>
                        {props.noButtonText ? props.buttonText : "No"}
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default yesNoDialog;