import React, {useState, useEffect} from 'react'
import Jimp from 'jimp';

import placeholder from '../../assets/images/placeholder.png';

import { usePromiseTracker } from "react-promise-tracker";

import './DrawImage.css';

import ChimpanzeeSubconscious from '../../chimpanzee/ChimpanzeeSubconscious';
import ChimpanzeeWithBrush from '../../chimpanzee/ChimpanzeeWithBrush';

import Button from '../../components/UI/Button/Button';
import Image from './Image/Image';
import BrushIcon from '@material-ui/icons/Brush';
import GetAppIcon from '@material-ui/icons/GetApp';
import AlertDialog from '../../components/AlertDialog/AlertDialog';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const DrawImage = () => {
    const IMAGE_CHILDREN_AMOUNT = parseInt(process.env.REACT_APP_AMOUNT_OF_IMAGE_CHILDREN)

    const [image, setImage] = useState(placeholder)
    const [viewPrediction, setViewPrediction] = useState(0);

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

    useEffect(() => {
        console.log(`VIEW PRED = ${viewPrediction}`)
    }, [viewPrediction])
        
    const drawImageClickHandler = async () => {
        //drawNewImage()

        const chimpanzee = new ChimpanzeeWithBrush();
        const chimpanzeeSubconscious = new ChimpanzeeSubconscious(chimpanzee)
        chimpanzee.build().then(async img => {
            await Jimp.read(image).then(im => {
                console.log(im)
                chimpanzee.setImage(im)
            })


            //for(let i = 0; i < 3; i++){
                await chimpanzeeSubconscious.drawAndPickBest(IMAGE_CHILDREN_AMOUNT).then(predictionsMap => {
                    const highestPred = Math.max.apply(null, Array.from(predictionsMap.keys()));

                    if(highestPred > viewPrediction){
                        const bestImg = predictionsMap.get(highestPred)

                        setViewPrediction(highestPred)
                        setImage(bestImg)
                        chimpanzee.setImage(bestImg)
                    }
                })  
            //}


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