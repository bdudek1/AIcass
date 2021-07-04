import './SavedImage.css';
import '../components/UI/Button/MarkViewButton/MarkViewButton.css';

import React, {useEffect, useState} from 'react';

import ReactTooltip from 'react-tooltip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Popover from '@material-ui/core/Popover';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

import YesNoDialog from '../components/AlertDialog/YesNoDialog';

import LocalImageRepository from '../repositories/LocalImageRepository';
import useMouseDownPosition from '../utils/MouseDownPosition';

const SavedImageView = (props) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [imageRepo, setImageRepo] = useState(new LocalImageRepository())

    const [infoX, setInfoX] = useState(0)
    const [infoY, setInfoY] = useState(0)

    const { x, y } = useMouseDownPosition();

    const buyNftButton =     <button
                                data-tip="Get NFT and make the image yours forever!"
                                data-for="NftButton"
                                className="MarkViewButton AsNonView">
                                    <div>GET NFT</div>
                             </button>

    const onRemoveClicked = () => {
        setShowDeleteDialog(true)
    }

    useEffect(() => {
        if(!showInfo) {
            setInfoY(y)
            setInfoX(x)
        }
    }, [x, y])

    const deleteImage = () => {
        imageRepo.removeImage(props.savedImage.name)

        props.setSavedImages(props.savedImages.filter(img => img.name !== props.savedImage.name))

        setShowDeleteDialog(false)
    }


    const deleteImageDialog = <YesNoDialog 
                                    open={() => setShowDeleteDialog(true)} 
                                    closed={() => setShowDeleteDialog(false)}
                                    yesClicked={deleteImage}
                                    noClicked={() => setShowDeleteDialog(false)}>
                                        Do you want to delete image "{props.savedImage.name}"?
                               </YesNoDialog>
                                
                                
    return (
            <Grid item xs={12} sm={4} key={props.savedImage.name}>
                <Card className="SavedImage">
                    <Grid container spacing={0}>
                            <Grid item xs={11}>
                                <Typography>
                                    {props.savedImage.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <CloseIcon className="Icon" onClick={onRemoveClicked}/>
                            </Grid>
                    </Grid>
                    <CardActionArea key={props.savedImage.name}>  
                        <CardMedia
                            component="img"
                            height="200"
                            width="180"
                            src={props.savedImage.image ? props.savedImage.image.currentSrc : <Skeleton variant="rect" />}
                            title={props.savedImage ? props.savedImage.name : <Skeleton variant="text" />}/>
                        <CardContent>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            {buyNftButton}
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={2}>
                            <InfoIcon className="Icon" onClick ={() => setShowInfo(true)}/>
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={1}>
                            <div data-tip="Sell your NFT image." data-for="Sell">
                                <AttachMoneyIcon className="Icon" />
                            </div>    
                        </Grid>
                    </Grid>
                    </CardActions>
                </Card>

                {showDeleteDialog ? deleteImageDialog : null}

                <Popover
                    id={props.savedImage.name}
                    open={showInfo}
                    onClose={() => setShowInfo(false)}
                    className="Popover"
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: infoY, left: infoX }}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                      }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                      }}
                    >
                    <div className="PopoverText">
                        
                        <Typography inline>Name: {props.savedImage.name ? props.savedImage.name : <Skeleton variant="text" />}</Typography>
                        <Typography inline>View percentage: {!isNaN(props.savedImage.viewPrediction) ? props.savedImage.viewPrediction.toFixed(2) : <Skeleton variant="text" />} %</Typography>
                        <Typography inline>Created in: {!isNaN(props.savedImage.creationTime) ? props.savedImage.creationTime : <Skeleton variant="text" />} s</Typography>
                        <Typography inline>Creation date: {props.savedImage.creationDate ? new Date(props.savedImage.creationDate).toLocaleString() : <Skeleton variant="text" />}</Typography>

                    </div>
                </Popover>

                <ReactTooltip 
                    id="NftButton"
                    backgroundColor="#33B7EE"
                    borderColor="#B637F1"
                    border="true"
                    className="Tooltip" />

                <ReactTooltip 
                    id="Sell"
                    backgroundColor="#33B7EE"
                    borderColor="#B637F1"
                    border="true"
                    className="Tooltip" />

            </Grid>
    )
}

export default SavedImageView;