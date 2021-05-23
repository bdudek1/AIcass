import Jimp from 'jimp';

import Point from "../utils/Point";

class ShapeCreator {
    static IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)
    static IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)

    static getCircle() {
        const randomX = Math.floor(Math.random() * this.IMAGE_WIDTH);
        const randomY = Math.floor(Math.random() * this.IMAGE_HEIGHT);

        const randomRadius = Math.floor(Math.random() * this.IMAGE_WIDTH/4);

        const fillPercentage = Math.floor(Math.random() * 80);

        const middlePoint = new Point(randomX, randomY)

        return {point: middlePoint,
                radius: randomRadius,
                fillPercentage: fillPercentage,
                colour: this.getRandomGrayColour()}
    }

    static getEllipse() {
        const randomX = Math.floor(Math.random() * this.IMAGE_WIDTH);
        const randomY = Math.floor(Math.random() * this.IMAGE_HEIGHT);

        const randomHeight = Math.floor(Math.random() * this.IMAGE_HEIGHT/4)
        const randomWidth = Math.floor(Math.random() * this.IMAGE_WIDTH/4)

        const randomAngle = Math.floor(Math.random() * 180)

        const fillPercentage = Math.floor(Math.random() * 80);

        const middlePoint = new Point(randomX, randomY)

        return {point: middlePoint,
                height: randomHeight,
                width: randomWidth,
                angle: randomAngle,
                fillPercentage: fillPercentage,
                colour: this.getRandomGrayColour()}
    }

    static getRandomPixels() {
        const fillPercentage = Math.floor(Math.random() * 10);

        const amountOfPixels = fillPercentage * this.IMAGE_WIDTH * this.IMAGE_HEIGHT / 100

        return {amountOfPixels: amountOfPixels,
                colour: this.getRandomGrayColour()}
    }

    static getRandomGrayColour () {
        const opacity = Math.floor(Math.random() * 220);

        return Jimp.rgbaToInt(0, 0, 0, opacity);
    }

    static getRandomColour () {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        const opacity = Math.floor(Math.random() * 255);

        return Jimp.rgbaToInt(red, green, blue, opacity);
    }
}

export default ShapeCreator