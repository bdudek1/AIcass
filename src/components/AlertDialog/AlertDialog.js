import React from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';

import './AlertDialog.css'
import '../../global_styles/styles.css'

const alertDialog = (props) => {
    return (
        <React.Fragment>
            <Backdrop
                show={props.open}
                clicked={props.closed}/>
            <div className="AlertDialog">
                <div className="TextStyle">{props.children}</div>
                <div style={{marginBottom:"-10px"}}>
                    <Button clicked={props.closed}>Ok</Button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default alertDialog;