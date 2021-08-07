import {useEffect, useState, useRef} from 'react'

import './SavedImage.css';
import Grid from '@material-ui/core/Grid';

import SavedImageView from "./SavedImageView";
import { Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

const SavedImageGridView = (props) => {
    const [savedImages, setSavedImages] = useState(props.savedImages)
    const [shownImages, setShownImages] = useState(new Array())
    const [hasMoreImages, setHasMoreImages] = useState(true)

    const scrollerRef = useRef(null);

    const imagesPerScroll = 3;

    useEffect(async () => {
        await sleep(10);
        const savedImagesBuf = new Array();

        if(props.savedImages){
            props.savedImages.forEach(img => savedImagesBuf.push(<SavedImageView savedImage={img}
                                                                                 savedImages={props.savedImages}
                                                                                 setSavedImages={props.setSavedImages}/>))
        }

        setSavedImages(savedImagesBuf)
        setShownImages(new Array())
        setHasMoreImages(true)
    }, [props.savedImages])
    
    useEffect(() => {
        scrollerRef.current.pageLoaded = 0
        loadMoreShownImages(1)
    }, [savedImages])

    const loadMoreShownImages = async (page) => {
        const loadStart = (page-1)*imagesPerScroll;
        const loadEnd = (page)*imagesPerScroll;

        const bufImages = savedImages.slice(loadStart, loadEnd)
        
        if(bufImages.length < imagesPerScroll){
            setHasMoreImages(false)
        }else{
            setHasMoreImages(true)
        }

        if(page === 1){
            setShownImages(bufImages)
        }else{
            setShownImages(shownImages.concat(bufImages))
        }

    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    return (
        <div className="SavedImageContainer">
            <Grid   
                    container
                    direction="row"
                    justify="center"
                    alignCotnent="center"
                    spacing={5}
                    style={{marginTop:"150px"}}>
                {shownImages.length > 0 ? shownImages : 
                <Grid item xs={10} sm={6}>
                    <Typography variant="h6">
                         You have no favourite images, add some!
                    </Typography>
                </Grid>}
            </Grid>

            <InfiniteScroll
                ref={scrollerRef}
                pageStart={0}
                threshold={10}
                loadMore={loadMoreShownImages}
                hasMore={hasMoreImages}
                loader={null} />
        </div>

    )
}

export default SavedImageGridView;