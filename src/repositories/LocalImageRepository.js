import SavedImage from "../savedImage/SavedImage";
import ImageRepository from './ImageRepository'
import ImageUtils from "../utils/ImageUtils";

class LocalImageRepository extends ImageRepository{

    getImages() {
        const savedImages = new Array();

        Object.keys(localStorage).forEach(key => {
            if(key.startsWith("savedImage/")){
                savedImages.push(this.getImage(key.split("/")[1]))
            }
        })

        return savedImages;
    }

    getImagesBySearchValue(searchValue) {
        const savedImages = new Array();

        Object.keys(localStorage).forEach(key => {
            if(key.startsWith("savedImage/")){
                savedImages.push(this.getImageBySearchValue(key.split("/")[1], searchValue))
            }
        })

        return savedImages;
    }

    getImage(name) {
        const jsonSavedImage = JSON.parse(window.localStorage.getItem(`savedImage/${name}`))
        if(!jsonSavedImage){
            return null;
        }
        
        const image = new Image();

        ImageUtils.loadImageSrc(jsonSavedImage.image).then((img) => {
            image.src = img.src
        })

        const savedImage = new SavedImage(jsonSavedImage.name, image, jsonSavedImage.viewPrediction, jsonSavedImage.creationTime)
        savedImage.setCreationDate(jsonSavedImage.creationDate)

        return savedImage
    }

    getImageBySearchValue(name, searchValue) {
        const jsonSavedImage = JSON.parse(window.localStorage.getItem(`savedImage/${name}`))
        if(!jsonSavedImage || !jsonSavedImage.name.toLowerCase().includes(searchValue.toLowerCase())){
            return null;
        }
        
        const image = new Image();

        ImageUtils.loadImageSrc(jsonSavedImage.image).then((img) => {
            image.src = img.src
        })

        const savedImage = new SavedImage(jsonSavedImage.name, image, jsonSavedImage.viewPrediction, jsonSavedImage.creationTime)
        savedImage.setCreationDate(jsonSavedImage.creationDate)

        return savedImage
    }

    saveImage(savedImage) {
        return window.localStorage.setItem(`savedImage/${savedImage.getName()}`, JSON.stringify(savedImage))
    }

    removeImage(name) {
        return window.localStorage.removeItem(`savedImage/${name}`)
    }
}

export default LocalImageRepository;