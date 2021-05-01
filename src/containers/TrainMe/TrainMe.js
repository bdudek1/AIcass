import React, {useState, useEffect} from 'react'
import { usePromiseTracker } from "react-promise-tracker";

import './TrainMe.css';
import '../../components/UI/Button/Button.css'
import '../../global_styles/styles.css'

import Button from '../../components/UI/Button/Button';
import Switch from '../../components/UI/Switch/Switch';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import Spinner from '../../components/UI/Spinner/Spinner';
import ImageRowContainer from '../../containers/TrainMe/ImageRowContainer/ImageRowContainer';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import _ from 'underscore-node'
import aiManagerInstance from '../../utils/AiManager';

const TrainMe = () => {
    const { promiseInProgress } = usePromiseTracker();

    const aiManager = aiManagerInstance

    const [showUploadImageDialog, setShowUploadImageDialog] = useState(false);
    const [showThankYouDialog, setShowThankYouDialog] = useState(false);
    const [isAnyImageUploaded, setIsAnyImageUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [areAllImagesViews, setAreAllImagesViews] = useState(true);

    const [filesList, setFilesList] = useState(new Array());

    let buttonWidth, iconSize;

    const isMobile = useMediaQuery('(max-width:768px)')
    const isSmallMobile = useMediaQuery('(max-width:500px)')

    buttonWidth = "220px";
    iconSize = 23;

    if(isMobile){
        buttonWidth = "195px";
        iconSize = 19;
    }
    if(isSmallMobile){
        buttonWidth = "170px";
        iconSize = 16;
    }

    const trainMeClickedHandler = () => {
        if(!isAnyImageUploaded){
            setShowUploadImageDialog(true);
        }else{
            aiManager.trainModelByFileList(filesList, setShowThankYouDialog)

            setFilesList([]);

            setIsAnyImageUploaded(false);
            //setShowThankYouDialog(true);
        }
    }

    let fileSelector = buildImageSelector();

    useEffect(() => {
        fileSelector  = buildImageSelector();
    }, [fileSelector])
      
    //if new file is added it is assumed it is a view and its tensor is set
    useEffect(() => {
        aiManager.classifyLoadedImages(filesList)
    }, [filesList])

    useEffect(() => {
        setIsLoading(promiseInProgress)
    }, [promiseInProgress])

    //opens adding images dialog
    const handleImageSelect = (e) => {
        e.preventDefault();
        fileSelector.click();
    }

    //remove clicked image from training AI array
    const handleRemoveImageClick = (key) => {
        const imgsArray = filesList;

        imgsArray.splice(key, 1);
        setFilesList([...imgsArray]);
        if(filesList.length < 1){
            setIsAnyImageUploaded(false);
        }

    }

    const handleRemoveAllImagesClick = () => {
        setFilesList([]);
        setIsAnyImageUploaded(false);
    }

    //change all images view value
    const handleSwitchClicked = () => {
        setAreAllImagesViews(!areAllImagesViews);
        const imgsArray = filesList;

        imgsArray.forEach(file => {
            file.isView = areAllImagesViews;
        })
        setFilesList(imgsArray);
    }

    //change clicked image view value
    const handleToggleIsView = (index) => {
        const imgsArray = filesList;
        imgsArray[index].isView = !imgsArray[index].isView;
        setFilesList([...imgsArray]);
    }

    //adds images to training AI array
    function handleImagesAdded() {
        const oldFiles = filesList;
        const newFiles = this.files;

        const setFiles = [...oldFiles, ...newFiles];
        const together = [...new Set(setFiles)]

        setFilesList(_.uniq([...together], file => file.name));

        setIsAnyImageUploaded(true)
    }

    function buildImageSelector(){
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        fileSelector.setAttribute('accept', 'image/*');
        fileSelector.addEventListener("change", handleImagesAdded, false);
        return fileSelector;
    }

    const closeUploadImageDialogHandler = () => {
        setShowUploadImageDialog(false);
    }

    const closeThankYouDialogHandler = () => {
        setShowThankYouDialog(false);
    }

    const uploadImageDialog = <AlertDialog 
                            open={showUploadImageDialog} 
                            closed={closeUploadImageDialogHandler}>Please upload image(s) first.</AlertDialog>

    const thankYouDialog = <AlertDialog 
                                open={showThankYouDialog} 
                                closed={closeThankYouDialogHandler}><p><strong>Success!</strong></p> Thank you very much for making AIcasso better!</AlertDialog>

    return(
        <div>
            <div className="TrainMe">
                <div className="TextStyle">
                    <text>Upload image(s) and mark them as views or non-views.
                          By doing that you're making me even better in painting views for you! The more images the better I will get!</text>
                </div>

                <div style={{marginTop:"0.75em"}}>
                        <p className="TextStyle"><strong>My all images are</strong></p>
                        <Switch clicked={handleSwitchClicked}/>  

                        {isLoading ? <Spinner/> : null}
                        
                        <ImageRowContainer items={filesList} 
                                           clicked={handleRemoveImageClick}
                                           changeIsView={handleToggleIsView}
                                           removeAll={handleRemoveAllImagesClick}
                                           buttonDisabled={isLoading}/>
                </div>

                {showUploadImageDialog ? uploadImageDialog : null}
                {showThankYouDialog ? thankYouDialog : null}

                <Button buttonWidth={buttonWidth}
                        clicked={handleImageSelect} 
                        disabled={isLoading}>
                    <AddPhotoAlternateIcon style={{fontSize: iconSize, marginBottom:"-4px"}}/>
                    <span style={{marginLeft: "3px"}}>Upload image(s)</span>
                </Button>
                <Button buttonWidth={buttonWidth} 
                        clicked={trainMeClickedHandler}
                        disabled={isLoading}>
                    <FitnessCenterIcon style={{fontSize: iconSize, marginBottom:"-4px"}}/>
                    <span style={{marginLeft: "3px"}}>Train me!</span>
                </Button>
                
            </div>
        </div>
    );
};

export default TrainMe;