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
    
    setCreationDate(creationDate) {
        this.creationDate = creationDate;
    }
}

export default SavedImage;