import {useEffect, useState} from 'react'

import './SavedImage.css';
import Grid from '@material-ui/core/Grid';

import SavedImageView from "./SavedImageView";
import { Typography } from '@material-ui/core';

const SavedImageGridView = (props) => {
    const [savedImages, setSavedImages] = useState(props.savedImages)

    useEffect(() => {
        const savedImagesBuf = new Array();

        if(props.savedImages){
            props.savedImages.forEach(img => savedImagesBuf.push(<SavedImageView savedImage={img}
                                                                                 savedImages={props.savedImages}
                                                                                 setSavedImages={props.setSavedImages}/>))
        }

        setSavedImages(savedImagesBuf)
    }, [props.savedImages])

    return (
        <div className="SavedImageContainer">
            <Grid   
                    container
                    direction="row"
                    justify="center"
                    alignCotnent="center"
                    spacing={5}>
                {savedImages.length > 0 ? savedImages : 
                <Grid item xs={10} sm={6}>
                    <Typography variant="h6">
                         You have no favourite images, add some!
                    </Typography>
                </Grid>}
            </Grid>
        </div>

    )
}

export default SavedImageGridView;