import React from 'react';
import ReactTooltip from 'react-tooltip';

import './Image.css';
import '../../../global_styles/styles.css'

import Spinner from '../../../components/UI/Spinner/Spinner';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
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
                src={props.image} 
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

            <div>{props.showDialog ? drawImageDialog : null}</div>

        </div>
    )

};

export default Image;