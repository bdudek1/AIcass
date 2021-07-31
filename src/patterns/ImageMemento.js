class ImageMemento {
    image;
    viewPercentage;
    creationTime;
    isStep;

    constructor(image, time, viewPercentage, isStep) {
        this.image = image;
        this.creationTime = time;
        this.viewPercentage = viewPercentage;
        this.isStep = isStep;
    }

}

export default ImageMemento;