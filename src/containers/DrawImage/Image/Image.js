import React, {useEffect, useState} from 'react';
import ReactTooltip from 'react-tooltip';

import './Image.css';
import '../../../global_styles/styles.css'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Grid from '@material-ui/core/Grid';

import Spinner from '../../../components/UI/Spinner/Spinner';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import  '../../../components/UI/Button/MarkViewButton/MarkViewButton.css';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Image = (props) => {
    let buttonWidth, iconSize

    const [stopColor, setStopColor] = useState("primary")
    const [stopText, setStopText] = useState("STOP")

    const [showNftButton, setShowNftButton] = useState(false)

    const isMobile = useMediaQuery('(max-width:768px)')
    const isSmallMobile = useMediaQuery('(max-width:500px)')

    useEffect(() => {
        if(props.isDrawing){
            setStopColor("secondary")
            setStopText("STOP")
            setShowNftButton(false)
            props.setIsDrawn(false)
        }else {
            setStopColor("primary")
            setStopText("CONTINUE")
            props.setIsDrawn(true)
        }
    }, [props.isDrawing])

    const handleNftClick = () => {
        
    }

    const handleStopClick = () => {
        if(stopText === "STOP"){
            setShowNftButton(true)
        }

        props.setDrawing(!props.isDrawing)
    }

    const handleRefreshClick = () => {
        setShowNftButton(false)

        props.refreshImage()
    }

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
                                style={{marginTop: "-30px", marginLeft:"8px"}}
                                onClick={handleNftClick}>
                                    <div>GET NFT</div>
                             </button>

    const drawImageDialog = <AlertDialog 
                                open={props.showDialog} 
                                closed={props.closeDialog}>Please draw image first.</AlertDialog>
return(
        <div>
            {props.disabled ? <Spinner isShown={props.disabled} /> : null}

            <div>{props.showDialog ? drawImageDialog : null}</div>
            <Card className="Image">
                <CardActionArea>
                <AutorenewIcon className="RefreshIcon" onClick={() => handleRefreshClick()}/>
                    <CardMedia
                        component="img"
                        height="320"
                        width="280"
                        image={props.image}
                        title="AICasso image"/>
                        <div style={{display: "flex", flexDirection: "column"}}
                                data-tip="Only 3$!">

                            {showNftButton ? buyNftButton : null}
                            
                            <ReactTooltip 
                                backgroundColor="#33B7EE"
                                borderColor="#B637F1"
                                border="true" />
                        </div>
                    <CardContent>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <Grid container spacing={0}>
                    <Grid item xs={5}>
                        <Typography>
                            View: {props.viewPrediction} %
                        </Typography>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={5}>
                        <Button size="small" 
                                color={stopColor}
                                style={{marginTop:"-10px"}}
                                onClick={() => handleStopClick()}>
                                {stopText}
                        </Button>
                    </Grid>
                </Grid>
                </CardActions>
            </Card>
        </div>
    )

};

export default Image;