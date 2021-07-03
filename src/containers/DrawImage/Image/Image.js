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
import RestorePageIcon from '@material-ui/icons/RestorePage';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

import Grid from '@material-ui/core/Grid';

import Spinner from '../../../components/UI/Spinner/Spinner';
import  '../../../components/UI/Button/MarkViewButton/MarkViewButton.css';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Image = (props) => {
    let buttonWidth, iconSize

    const [stopColor, setStopColor] = useState("primary")
    const [stopText, setStopText] = useState("STOP")

    const [showButtons, setShowButtons] = useState(false)

    const isMobile = useMediaQuery('(max-width:768px)')
    const isSmallMobile = useMediaQuery('(max-width:500px)')

    useEffect(() => {
        handleIsDrawingChange()
    }, [props.isDrawing])

    useEffect(() => {
        console.log(props.imageCaretaker)
    }, [props.imageCaretaker])

    const handleNftClick = () => {
        
    }

    const handleIsDrawingChange = () => {
        if(props.isDrawing){
            setStopColor("secondary")
            setStopText("STOP")
            setShowButtons(false)
        }else {
            setStopColor("primary")
            setStopText("CONTINUE")
            setShowButtons(true)
        }
    }

    const handleStopClick = () => {
        if(stopText === "STOP"){
            setShowButtons(true)
        }else{

            props.imageCaretaker.clearFurtherMementos()
        }

        props.setDrawing(!props.isDrawing)
    }

    const handleRefreshClick = () => {
        setShowButtons(false)
        
        props.imageCaretaker.clearMementos();
        props.refreshImage()
    }

    const handleRedoClick = () => {
        props.loadImageMemento(props.imageCaretaker.getNextMemento())
    }

    const handleUndoClick = () => {
        props.loadImageMemento(props.imageCaretaker.getPreviousMemento())
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


return(
        <div>
            {props.disabled ? <Spinner isShown={props.disabled} /> : null}

            <Card className="Image">
                <CardActionArea>
                {showButtons ?  <StarBorderIcon className="StarIcon" onClick={() => props.openSaveDialog()}/> : null}
                {showButtons ?  <RestorePageIcon className="RefreshIcon" onClick={() => handleRefreshClick()}/> : null}
                {showButtons && props.imageCaretaker.hasNext() ?  <RedoIcon className="RedoIcon" onClick={() => handleRedoClick()} /> : null}
                {showButtons && props.imageCaretaker.hasPrevious() ?  <UndoIcon className="UndoIcon" onClick={() => handleUndoClick()} /> : null}
                    <CardMedia
                        component="img"
                        height="320"
                        width="280"
                        image={props.image}
                        title="AICasso image"/>
                        <div style={{display: "flex", flexDirection: "column"}}
                                data-tip="Only 3$!">
                            
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
                    <Grid item xs={4}>
                        <Typography>
                            View: {isMobile ? props.viewPrediction.toFixed(1) : props.viewPrediction.toFixed(2)} %
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            Time: {props.drawingTime} s
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
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