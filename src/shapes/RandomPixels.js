import Point from '../shapes/Point';

class RandomPixels {
    IMAGE_WIDTH;
    IMAGE_HEIGHT;

    amountOfPixels;
    color;

    constructor(amountOfPixels, color){
        this.amountOfPixels = amountOfPixels;
        this.color = color;
        this.IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)
        this.IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)
    }

    draw(image) {
        let i = 0

        while(i < this.amountOfPixels){
            const randomX = Math.floor(Math.random() * this.IMAGE_HEIGHT)
            const randomY = Math.floor(Math.random() * this.IMAGE_WIDTH)
            const randomPoint = new Point(randomX, randomY)

            this.drawPixel(this.color, randomPoint, image)

            i++
        }
    }

    drawPixel(color, point, image) {
        image.setPixelColor(color, point.getX(), point.getY());
    }

}

export default RandomPixels;