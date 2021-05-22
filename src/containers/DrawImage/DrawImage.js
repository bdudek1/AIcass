import React, {useState, useEffect} from 'react'

import placeholder from '../../assets/images/placeholder.png';

import { usePromiseTracker } from "react-promise-tracker";

import './DrawImage.css';

import Point from './../../utils/Point'
import ChimpanzeeWithBrush from '../../ChimpanzeeWithBrush';

import Button from '../../components/UI/Button/Button';
import Image from './Image/Image';
import BrushIcon from '@material-ui/icons/Brush';
import GetAppIcon from '@material-ui/icons/GetApp';
import AlertDialog from '../../components/AlertDialog/AlertDialog';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const DrawImage = () => {
    const [image, setImage] = useState(placeholder)
    const [viewPrediction, setViewPrediction] = useState(1);

    const { promiseInProgress } = usePromiseTracker();

    const [isLoading, setIsLoading] = useState(false);
    const [isImageDrawn, setIsImageDrawn] = useState(false);
    const [isImageDrawing, setIsImageDrawing] = useState(false)
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
        drawNewImage()

        const chimpanzee = new ChimpanzeeWithBrush();
        chimpanzee.build().then(image => {
            chimpanzee.setImage(image)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(300, 150), 60, 50)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(150, 150), 45, 50)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(400, 250), 30, 50)
            chimpanzee.drawLeaningEllipse(40, 120, new Point(450, 150), 90, 50)
            chimpanzee.drawRandomPixels(5000)

            const t1 = performance.now()
            chimpanzee.getBase64Image().then(img => {
                setImage(img)
                const t2 = performance.now()
                console.log(`DRAWING IMAGE DONE IN ${t2 - t1} [MS]`)
            })
            chimpanzee.getViewPrediction().then(prediction => {
                setViewPrediction(prediction)
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

    const refreshImage = () => {
        setImage(placeholder)
        setIsImageDrawing(false)
        setIsImageDrawn(false)
    }

    const drawNewImage = () => {
        setImage(placeholder)
        setIsImageDrawn(false)
        setIsImageDrawing(true)
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
                   image={image}
                   viewPrediction={viewPrediction}
                   isDrawing={isImageDrawing}
                   setDrawing={(params) => setIsImageDrawing(params)}
                   setIsDrawn={(params) => setIsImageDrawn(params)}
                   refreshImage={() => refreshImage()}/>
            <Button buttonWidth={buttonWidth}
                    clicked={drawImageClickHandler} 
                    disabled={isImageDrawing}>
                <BrushIcon style={{fontSize: iconSize, marginBottom: "-4px"}}/>
                <span style={{marginLeft: "3px"}}>Draw image!</span>
            </Button>
            <a href={image} download={!isImageDrawing}>
                <Button buttonWidth={buttonWidth}
                        clicked={downloadClickHandler} 
                        disabled={isImageDrawing}>
                    <GetAppIcon style={{fontSize: iconSize, marginBottom: "-4px"}}/>
                    <span style={{marginLeft: "3px"}}>Download</span>
                </Button>
            </a>

        </div>
    );
}
    


export default DrawImage;