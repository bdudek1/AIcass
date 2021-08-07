class SavedImage {
    name;
    image;
    viewPrediction;
    creationTime;
    creationDate;

    constructor(name, image, viewPrediction, creationTime) {
        this.name = name;
        this.image = image;
        this.viewPrediction = viewPrediction;
        this.creationTime = creationTime;
        this.creationDate = Date.now();
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getViewPrediction() {
        return this.viewPrediction;
    }
    
    setCreationDate(creationDate) {
        this.creationDate = creationDate;
    }

    getCreationDate(){
        return this.creationDate;
    }
}

export default SavedImage;