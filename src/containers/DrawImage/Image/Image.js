import React from 'react';
import ReactTooltip from 'react-tooltip';

import './Image.css';
import '../../../global_styles/styles.css'

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import placeholder from '../../../assets/images/placeholder.png';
import Button from '../../../components/UI/Button/Button';
import  '../../../components/UI/Button/MarkViewButton/MarkViewButton.css';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Image = (props) => {
    let buttonWidth, iconSize;

    const isMobile = useMediaQuery('(max-width:768px)')
    const isSmallMobile = useMediaQuery('(max-width:500px)')

    buttonWidth = "110px";
    iconSize = 23;

    if(isMobile){
        buttonWidth = "95px";
        iconSize = 19;
    }
    if(isSmallMobile){
        buttonWidth = "90px";
        iconSize = 16;
    }

    const buyNftButton =     <button
                                className="MarkViewButton AsNonView"
                                style={{marginTop: "-30px", marginLeft:"8px"}}>
                                    <div>BUY NFT</div>
                             </button>

    const drawImageDialog = <AlertDialog 
                                open={props.showDialog} 
                                closed={props.closeDialog}>Please draw image first.</AlertDialog>
return(
        <div className="Image">
        <img
            style={{width: "100%",margin: "auto"}}
            src={placeholder} 
            alt="AIcasso"></img>

        <div style={{display: "flex", flexDirection: "column"}}
             data-tip="Only 3$!">

                {props.isDrawn ? buyNftButton : null}
                <ReactTooltip 
                backgroundColor="#33B7EE"
                borderColor="#B637F1"
                border="true" />
        </div>

        {props.disabled ? <Spinner isShown={props.disabled} /> : null}
        <p className="TextStyle">Is that image a view?</p>  
        <div>{props.showDialog ? drawImageDialog : null}</div>

        <Button buttonWidth={buttonWidth} clicked={props.clicked} disabled={props.disabled}>
            <CheckIcon style={{fontSize: iconSize, marginBottom:"-4px"}}/>
            <span style={{marginLeft: "3px"}}>Yes</span>
        </Button>
        <Button buttonWidth={buttonWidth} clicked={props.clicked} disabled={props.disabled}>
            <CloseIcon style={{fontSize: iconSize, marginBottom:"-4px"}}/>
            <span style={{marginLeft: "3px"}}>No</span>
        </Button>

    </div>
)


};

export default Image;