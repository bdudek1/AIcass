import SavedImage from "../savedImage/SavedImage";
import ImageRepository from './ImageRepository'

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

    getImage(name) {
        const jsonSavedImage = JSON.parse(window.localStorage.getItem(`savedImage/${name}`))
        if(!jsonSavedImage){
            return false;
        }
        const image = new Image();
        image.src = jsonSavedImage.image;

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