import React from 'react';

import './ImageRow.css'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';


const ImageRow = (props) => {
    const predictionText = `The image is in ${parseFloat(props.file.viewPrediction*100).toFixed(2)}% a view`
    const highestPredictionText = props.file.highestPrediction ? 
    `The image is ${props.file.highestPrediction.name} in ${parseFloat(props.file.highestPrediction.value*100).toFixed(2)}%` : null

    let imgNameDisplayText = props.file.name
    let imgNameLength = props.file.name.length;

    if(imgNameLength > 13){
        imgNameDisplayText = imgNameDisplayText.substring(0, 11) + "..."
    }

    return(
            <Card className="ImageRow" style={{position:"relative"}}>
                <CardContent className="CardContent">
                    <div className="CardDetails">
                        <CardMedia
                            component="img"
                            image={props.file.image ? props.file.image.src : null}
                            title={imgNameDisplayText}
                            className="CardImg"/>
                        <Typography variant="subtitle2">
                            {imgNameDisplayText}
                        </Typography>
                    </div>

                        <div className="CardDetails">
                            <Typography component="h7" variant="h7" className="CardText">
                                {predictionText}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" style={{marginTop: "5px"}}>
                                {highestPredictionText}
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