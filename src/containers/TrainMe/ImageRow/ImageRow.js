import React from 'react';

import './ImageRow.css'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIcon from '@material-ui/icons/Close';


const ImageRow = (props) => {
    const predictionText = (props.file.viewPrediction || props.file.viewPrediction === 0)? 
    `The image is in ${parseFloat(props.file.viewPrediction*100).toFixed(2)}% a view` : null;

    const highestPredictionText = props.file.highestPrediction ? 
    `The image is ${props.file.highestPrediction.name} in ${parseFloat(props.file.highestPrediction.value*100).toFixed(2)}%` : null

    let imgNameDisplayText = props.file.name ? props.file.name : null
    let imgNameLength = props.file.name.length;

    if(imgNameLength > 12){
        imgNameDisplayText = imgNameDisplayText.substring(0, 10) + "..."
    }

    return(
            <Card className="ImageRow" style={{position:"relative"}}>
                <CardContent className="CardContent">
                    <div className="CardDetails">
                        {props.file.image ? <CardMedia
                            component="img"
                            image={props.file.image ? props.file.image.src : null}
                            title={imgNameDisplayText}
                            className="CardImg"/> : <Skeleton variant="rect" width={80} height={60} />}
                        <Typography component="h7" variant="h7">
                            {imgNameDisplayText ? imgNameDisplayText : <Skeleton variant="text" width={80} height={20} />}
                        </Typography>
                    </div>

                        <div className="CardDetails">
                            <Typography component="h7" variant="h7" className="CardText">
                                {predictionText ? predictionText : <Skeleton variant="text" width={150} height={20}/>}
                            </Typography>
                            <Typography component="h7" variant="h7" color="textSecondary" style={{marginTop: "5px"}}>
                                {highestPredictionText ? highestPredictionText : <Skeleton variant="text" width={150} height={20}/>}
                            </Typography>
                        </div>
                        <div className="CardDetails">
                            <CloseIcon onClick={props.remove} className="CardClose"/>  
                        </div>
                </CardContent>
          </Card>
    )
}

export default ImageRow;