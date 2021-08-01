class ImageMemento {
    image;
    viewPercentage;
    creationTime;

    constructor(image, time, viewPercentage) {
        this.image = image;
        this.creationTime = time;
        this.viewPercentage = viewPercentage;
    }

}

export default ImageMemento;