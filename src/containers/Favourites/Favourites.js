import React from 'react'

import {useEffect, useState} from 'react';

import './Favourites.css';
import '../../global_styles/styles.css'

import LocalImageRepository from '../../repositories/LocalImageRepository';
import SavedImagesGridView from '../../savedImage/SavedImagesGridView'

const Favourites = () => {
    const [savedImages, setSavedImages] = useState(new Array());

    useEffect(() => {
        const imageRepo = new LocalImageRepository();

        console.log(imageRepo.getImages())
        setSavedImages(imageRepo.getImages())
    }, [])
    
    return (
        <div>
            <SavedImagesGridView savedImages={savedImages} />
        </div>
    )
};

export default Favourites;