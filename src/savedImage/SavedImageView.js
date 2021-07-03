import './SavedImage.css';
import '../components/UI/Button/MarkViewButton/MarkViewButton.css';

import React, {useState} from 'react';

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
import Grid from '@material-ui/core/Grid';

import YesNoDialog from '../components/AlertDialog/YesNoDialog';

import LocalImageRepository from '../repositories/LocalImageRepository';

const SavedImageView = (props) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [imageRepo, setImageRepo] = useState(new LocalImageRepository())

    const buyNftButton =     <button
                                data-tip="Get NFT and make the image yours forever!"
                                data-for="NftButton"
                                className="MarkViewButton AsNonView">
                                    <div>GET NFT</div>
                             </button>

    const onRemoveClicked = () => {
        setShowDeleteDialog(true)
    }

    const deleteImage = () => {
        imageRepo.removeImage(props.savedImage.name)

        window.location.reload()
    }

    const deleteImageDialog = <YesNoDialog 
                                    open={() => setShowDeleteDialog(true)} 
                                    closed={() => setShowDeleteDialog(false)}
                                    yesClicked={deleteImage}
                                    noClicked={() => setShowDeleteDialog(false)}>
                                        Do you want to delete image {props.savedImage.name}?
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
                            src={props.savedImage.image.currentSrc}
                            title={props.savedImage.name}/>
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
                    PaperProps={{zIndex:'100000000000'}}
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
                        
                        <Typography inline>Name: {props.savedImage.name}</Typography>
                        <Typography inline>View percentage: {props.savedImage.viewPrediction.toFixed(2)} %</Typography>
                        <Typography inline>Created in: {props.savedImage.creationTime} s</Typography>
                        <Typography inline>Creation date: {new Date(props.savedImage.creationDate).toLocaleString()}</Typography>

                    </div>
                </Popover>

                <ReactTooltip 
                    id="NftButton"
                    backgroundColor="#33B7EE"
                    borderColor="#B637F1"
                    border="true" />

                <ReactTooltip 
                    id="Sell"
                    backgroundColor="#33B7EE"
                    borderColor="#B637F1"
                    border="true" />

            </Grid>
    )
}

export default SavedImageView;