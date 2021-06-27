import {useEffect, useState} from 'react'
import SavedImageView from "./SavedImageView";

const SavedImageGridView = (props) => {
    const [savedImages, setSavedImages] = useState(new Array())

    useEffect(() => {
        const savedImagesBuf = new Array();

        if(props.savedImages){
            props.savedImages.forEach(img => savedImagesBuf.push(<SavedImageView savedImage={img}/>))
        }

        setSavedImages(savedImagesBuf)
    }, [props.savedImages])

    return (
        <div>
            {savedImages}
        </div>
    )
}

export default SavedImageGridView;