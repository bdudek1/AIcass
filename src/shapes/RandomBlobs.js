import DrawableAdapter from "../patterns/DrawableAdapter";

import Point from "./Point";
import Blob from "./Blob";

class RandomBlobs extends DrawableAdapter {
    IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)
    IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)
    MINIMUM_BLOB_AMOUNT = parseInt(process.env.REACT_APP_MINIMUM_BLOB_AMOUNT)
    MAXIMUM_BLOB_AMOUNT = parseInt(process.env.REACT_APP_MAXIMUM_BLOB_AMOUNT)
    MINIMUM_BLOB_PIXELS = parseInt(process.env.REACT_APP_MINIMUM_BLOB_PIXELS)
    MAXIMUM_BLOB_PIXELS = parseInt(process.env.REACT_APP_MAXIMUM_BLOB_PIXELS)

    amountOfBlobs;
    color;

    constructor(color){
        super()

        this.color = color;
        this.amountOfBlobs = Math.floor(Math.random() * (this.MAXIMUM_BLOB_AMOUNT - this.MINIMUM_BLOB_AMOUNT)) + this.MINIMUM_BLOB_AMOUNT;
    }

    draw(image) {
        let blobsDrawn = 0;

        while(blobsDrawn < this.amountOfBlobs){
            const randomX = Math.floor(Math.random() * this.IMAGE_HEIGHT)
            const randomY = Math.floor(Math.random() * this.IMAGE_WIDTH)
            const randomPoint = new Point(randomX, randomY)

            const amountOfPixels = Math.floor(Math.random() * (this.MAXIMUM_BLOB_PIXELS - this.MINIMUM_BLOB_PIXELS)) + this.MINIMUM_BLOB_PIXELS;

            new Blob(randomPoint, null, this.color, amountOfPixels).draw(image)

            blobsDrawn++;
        }

    }
}

export default RandomBlobs;