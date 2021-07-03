import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';
import Jimp from 'jimp';

import placeholder from '../../assets/images/placeholder.png';

import { usePromiseTracker } from "react-promise-tracker";

import './DrawImage.css';

import ChimpanzeeSubconscious from '../../chimpanzee/ChimpanzeeSubconscious';
import SavedImage from '../../savedImage/SavedImage';
import LocalImageRepository from '../../repositories/LocalImageRepository'
import ImageCaretaker from '../../patterns/ImageCaretaker';

import Button from '../../components/UI/Button/Button';
import Image from './Image/Image';
import BrushIcon from '@material-ui/icons/Brush';
import GetAppIcon from '@material-ui/icons/GetApp';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ImageMemento from '../../patterns/ImageMemento';

const DrawImage = () => {
    const history = useHistory() 

    const timer = useStopwatch({autoStart: false});
    const [additionalSeconds, setAdditionalSeconds] = useState(0);

    const timerRef = useRef(timer.seconds + timer.minutes*60 + timer.hours*3600 + additionalSeconds);
    timerRef.current = timer.seconds + timer.minutes*60 + timer.hours*3600 + additionalSeconds;

    const IMAGE_CHILDREN_MINIMUM_AMOUNT = parseInt(process.env.REACT_APP_MINIMUM_AMOUNT_OF_IMAGE_CHILDREN)
    const IMAGE_CHILDREN_MAXIMUM_AMOUNT = parseInt(process.env.REACT_APP_MAXIMUM_AMOUNT_OF_IMAGE_CHILDREN)

    const [image, setImage] = useState(placeholder)
    const [imageName, setImageName] = useState("name")

    const [viewPrediction, setViewPrediction] = useState(0);

    const { promiseInProgress } = usePromiseTracker();

    const [isLoading, setIsLoading] = useState(false);
    const [isImageRefreshed, setIsImageRefreshed] = useState(false);
    const [isImageDrawing, setIsImageDrawing] = useState(false)

    const [showSaveImageDialog, setShowSaveImageDialog] = useState(false);
    const [showSuccessSaveSnackbar, setShowSuccessSaveSnackbar] = useState(false);
    const [showFailureSaveSnackbar, setShowFailureSaveSnackbar] = useState(false);

    const [imageCaretaker, setImageCaretaker] = useState(new ImageCaretaker());

    const isImageDrawingRef = useRef(isImageDrawing);
    isImageDrawingRef.current = isImageDrawing;

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
        refreshImage()
        isImageDrawingRef.current = isImageDrawing;
     }, [history]) 

    useEffect(() => {
        if(isImageDrawingRef.current){

            if(isImageRefreshed){
                timer.reset()
                setIsImageRefreshed(false)
            }
            timer.start()

            const chimpanzeeSubconscious = new ChimpanzeeSubconscious()
    
            chimpanzeeSubconscious.getChimpanzee()
                                  .build()
                                  .then(() => {
    
                Jimp.read(image).then(im => {
                    chimpanzeeSubconscious.getChimpanzee().setImage(im)
                }).then(() => {
    
                    const drawAndGetBest = () => {
    
                        const imagesChildrenAmount = Math.floor(Math.random() * IMAGE_CHILDREN_MAXIMUM_AMOUNT - IMAGE_CHILDREN_MINIMUM_AMOUNT) + IMAGE_CHILDREN_MINIMUM_AMOUNT;
    
                        chimpanzeeSubconscious.drawAndPickBest(imagesChildrenAmount).then(prediction => {
    
                            if(prediction.bestPrediction*100 > viewPrediction && isImageDrawingRef.current){
                                setImage(prediction.bestImage)
                                console.log(timer)

                                saveImageMemento(prediction.bestImage, timerRef.current, prediction.bestPrediction*100)
    
                                Jimp.read(prediction.bestImage).then(im => {
                                    chimpanzeeSubconscious.getChimpanzee().setImage(im)
                                })
    
                                setViewPrediction(prediction.bestPrediction*100)
    
                            }
    
                        }).then(() => {
                            if(isImageDrawingRef.current && history.location.pathname === "/"){
                                setTimeout( drawAndGetBest, 0 ); 
                            }else{
                                clearTimeout(drawAndGetBest);
                            }
                        })
    
                }

                if(isImageDrawingRef.current){
                    drawAndGetBest();   
                }

                })
    
            })

        }else{
            timer.pause()
        }

    }, [isImageDrawing])
    
    useEffect(() => {
        setIsLoading(promiseInProgress)
    }, [promiseInProgress])

    useEffect(() => {
        console.log(`VIEW PRED = ${viewPrediction}`)
    }, [viewPrediction])
        
    const drawImageClickHandler = () => {
        drawNewImage()
    }

    const closeSaveImageDialogHandler = () => {
        setShowSaveImageDialog(false);
    }

    const openSaveImageDialogHandler = () => {
        setShowSaveImageDialog(true);
    }

    const downloadClickHandler = () => {
        if(!isImageRefreshed){

        }else{
            //download
        }
    }

    const refreshImage = () => {
        setAdditionalSeconds(0)
        timer.reset()
        timer.pause()
        setViewPrediction(0)
        setIsImageDrawing(false)
        setIsImageRefreshed(true)
        setImage(placeholder)
    }

    const drawNewImage = () => {
        setAdditionalSeconds(0)
        timer.reset()
        timer.start()
        setImage(placeholder)
        setIsImageRefreshed(false)
        setIsImageDrawing(true)
        setViewPrediction(0)
    }

    const saveImage = () => {
        const creationTime = timer.seconds + timer.minutes*60 + timer.hours*3600;

        const savedImage = new SavedImage(imageName, image, viewPrediction, creationTime);
        
        const imageRepo = new LocalImageRepository();

        if(imageRepo.getImage(imageName)){
            setShowFailureSaveSnackbar(true)
        }else{
            setShowSuccessSaveSnackbar(true)
            imageRepo.saveImage(savedImage)
        }

        setShowSaveImageDialog(false)
    }

    const handleImageNameChange = (event) => {
        setImageName(event.target.value)
    }

    const saveImageMemento = (image, time, prediction) => {
        imageCaretaker.addMemento(new ImageMemento(image, time, prediction))
    }

    const loadImageMemento = () => {
        const currentMemento = imageCaretaker.getCurrentMemento();

        console.log(currentMemento)

        timer.reset()
        timer.pause()

        setAdditionalSeconds(currentMemento.creationTime)
        setImage(currentMemento.image)
        setViewPrediction(currentMemento.viewPercentage)
    }

    const saveImageDialog = <AlertDialog 
                                open={showSaveImageDialog} 
                                closed={closeSaveImageDialogHandler}
                                clicked={saveImage}
                                buttonText="Save">Choose the image name.
                                <div className="EditText">
                                <TextField id="img-name"
                                           label="Image name"
                                           variant="outlined"
                                           size="small"
                                           value={imageName}
                                           onChange={handleImageNameChange} />
                                </div>
    </AlertDialog>

    const Alert = (props) => {
        return <MuiAlert elevation={6}
                         variant="filled"
                         {...props} />;
    }

    return(
        <div className="DrawImage">
            <Image key={viewPrediction}
                   disabled={isLoading}
                   clicked={downloadClickHandler}
                   showSaveDialog={showSaveImageDialog}
                   closeSaveDialog={closeSaveImageDialogHandler}
                   openSaveDialog={openSaveImageDialogHandler}
                   isDrawn={isImageRefreshed}
                   image={image}
                   viewPrediction={viewPrediction}
                   isDrawing={isImageDrawingRef.current}
                   drawingTime={timerRef.current}
                   setDrawing={(params) => setIsImageDrawing(params)}
                   setIsDrawn={(params) => setIsImageRefreshed(params)}
                   refreshImage={() => refreshImage()}
                   loadImageMemento={(memento) => loadImageMemento(memento)}
                   imageCaretaker={imageCaretaker}/>

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

            {showSaveImageDialog ? saveImageDialog : null}

            <Snackbar open={showSuccessSaveSnackbar}
                      autoHideDuration={5000} 
                      onClose={() => setShowSuccessSaveSnackbar(false)} 
                      style={{zIndex: '1000000'}}>
                <Alert onClose={() => setShowSuccessSaveSnackbar(false)} severity="success">
                    Image {imageName} saved to favorites!
                </Alert>
            </Snackbar>

            <Snackbar open={showFailureSaveSnackbar}
                      autoHideDuration={5000}
                      onClose={() => setShowFailureSaveSnackbar(false)} 
                      style={{zIndex: '1000000'}}>
                <Alert onClose={() => setShowFailureSaveSnackbar(false)} severity="error">
                    Image {imageName} already exists! Choose another name.
                </Alert>
            </Snackbar>

        </div>
    );
}
    


export default DrawImage;