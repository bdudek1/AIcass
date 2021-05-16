import React, {useState, useEffect} from 'react'

import placeholder from '../../assets/images/placeholder.png';

import { usePromiseTracker } from "react-promise-tracker";

import './DrawImage.css';

import Point from './../../utils/Point'

import Button from '../../components/UI/Button/Button';
import Image from './Image/Image';
import BrushIcon from '@material-ui/icons/Brush';
import GetAppIcon from '@material-ui/icons/GetApp';
import AlertDialog from '../../components/AlertDialog/AlertDialog';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChimpanzeeWithBrush from '../../ChimpanzeeWithBrush';

const DrawImage = () => {
    const [image, setImage] = useState(placeholder)

    const { promiseInProgress } = usePromiseTracker();

    const [isLoading, setIsLoading] = useState(false);
    const [isImageDrawn, setIsImageDrawn] = useState(false);
    const [showDrawImageDialog, setShowDrawImageDialog] = useState(false);

    const isMobile = useMediaQuery('(max-width:768px)')
    const isSmallMobile = useMediaQuery('(max-width:500px)')

    let buttonWidth, iconSize;

    buttonWidth = "200px";
    iconSize = 23;

    if(isMobile){
        buttonWidth = "170px";
        iconSize = 19;
    }
    if(isSmallMobile){
        buttonWidth = "150px";
        iconSize = 16;
    }
    
    useEffect(() => {
        setIsLoading(promiseInProgress)
    }, [promiseInProgress])
        
    const drawImageClickHandler = () => {
        const chimpanzee = new ChimpanzeeWithBrush();
        chimpanzee.build().then(image => {
            chimpanzee.setImage(image)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(300, 150), 60, 50)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(150, 150), 45, 50)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(400, 250), 30, 50)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(450, 150), 90, 50)
            chimpanzee.drawRandomPixels(5000)
            chimpanzee.getBase64Image().then(img => {
                setImage(img)
            })
        })
    }

    const closeAlertDialogHandler = () => {
        setShowDrawImageDialog(false);
    }

    const downloadClickHandler = () => {
        if(!isImageDrawn){
            setShowDrawImageDialog(true);
        }else{
            //download
        }
    }

    const drawImageDialog = <AlertDialog 
                            open={showDrawImageDialog} 
                            closed={closeAlertDialogHandler}>Please draw image first.</AlertDialog>

    return(
        <div className="DrawImage">
            <Image disabled={isLoading}
                   clicked={downloadClickHandler}
                   showDialog={showDrawImageDialog}
                   closeDialog={closeAlertDialogHandler}
                   isDrawn={isImageDrawn}
                   image={image}/>
            <Button buttonWidth={buttonWidth}
                    clicked={drawImageClickHandler} 
                    disabled={isLoading}>
                <BrushIcon style={{fontSize: iconSize, marginBottom: "-4px"}}/>
                <span style={{marginLeft: "3px"}}>Draw image!</span>
            </Button>
            <Button 
                    buttonWidth={buttonWidth}
                    clicked={downloadClickHandler} 
                    disabled={isLoading}>
                <GetAppIcon style={{fontSize: iconSize, marginBottom: "-4px"}}/>
                <span style={{marginLeft: "3px"}}>Download</span>
            </Button>
        </div>
    );
}
    


export default DrawImage;