import React from 'react'

import {useEffect, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './Favourites.css';
import '../../global_styles/styles.css'

import LocalImageRepository from '../../repositories/LocalImageRepository';
import SavedImagesGridView from '../../savedImage/SavedImagesGridView'

import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const Favourites = () => {
    const [savedImages, setSavedImages] = useState(new Array());
    const [imageRepo, setImageRepo] = useState(new LocalImageRepository())

    const [sort, setSort] = useState(null);

    useEffect(() => {
        setSavedImages(imageRepo.getImages())
    }, [])

    useEffect(() => {
        if(sort){
            setSavedImages(sortImages(sort, savedImages)) 
        }else{
            setSort('none')
        }
    }, [sort])

    const onSearchValChange = (event) => {
        setSavedImages(
            sortImages(sort, 
                        imageRepo.getImagesBySearchValue(event.target.value)
                                .slice()
                                .filter(img => img !== null))
        )
    }

    const sortImages = (sort, images) => {

        switch(sort){
            case 'view_desc':
                return images.slice().sort((img1, img2) => img2.getViewPrediction() - img1.getViewPrediction())
            case 'view_asc':
                return images.slice().sort((img1, img2) => img1.getViewPrediction() - img2.getViewPrediction())   
            case 'date_desc':
                return images.slice().sort((img1, img2) => img2.getCreationDate() - img1.getCreationDate())
            case 'date_asc':
                return images.slice().sort((img1, img2) => img1.getCreationDate() - img2.getCreationDate())
            case 'name_desc':
                return images.slice().sort((img1, img2) => img1.getName().localeCompare(img2.getName()))
            case 'name_asc':
                return images.slice().sort((img1, img2) => img2.getName().localeCompare(img1.getName()));
            default:
                return images;
        }

    }
    
    return (
        <div>
            <div className="tool-container">
                <Autocomplete
                    freeSolo
                    onInputChange={onSearchValChange}
                    disableClearable
                    size="small"
                    options={[]}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search by name"
                        margin="normal"
                        variant="outlined"
                        className="search-field"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            ),
                        }} />)}/>


                <FormControl size="small">
                        <Select
                            MenuProps={{ className: "popover" }}
                            labelId="sort-label"
                            variant="outlined"
                            value={sort}
                            className="sort-field"
                            displayEmpty
                            onChange={(event) => setSort(event.target.value)}>
                            <MenuItem value='none'>Sort</MenuItem>
                            <MenuItem value='view_desc'>Highest view prediction</MenuItem>
                            <MenuItem value='view_asc'>Lowest view prediction</MenuItem>
                            <MenuItem value='date_desc'>More new</MenuItem>
                            <MenuItem value='date_asc'>More old</MenuItem>
                            <MenuItem value='name_desc'>Name A-Z</MenuItem>
                            <MenuItem value='name_asc'>Name Z-A</MenuItem>
                        </Select>

                </FormControl>
            </div>

            <SavedImagesGridView 
                                 savedImages={savedImages}
                                 setSavedImages={(imgs) => setSavedImages(imgs)} />

        </div>
    )
};

export default Favourites;