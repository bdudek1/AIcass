import Jimp from 'jimp';

import Circle from '../shapes/Circle';
import Ellipse from '../shapes/Ellipse';
import Ring from '../shapes/Ring';
import DenseCircle from '../shapes/DenseCircle';
import DenseEllipse from '../shapes/DenseEllipse';
import RandomPixels from '../shapes/RandomPixels';
import Point from "../shapes/Point";
import RandomEffect from '../shapes/RandomEffect';
import RandomBlobs from '../shapes/RandomBlobs';

class DrawableFactory {
    
    static IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)
    static IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)

    static CIRCLES_FREQUENCY = parseInt(process.env.REACT_APP_CIRCLES_FREQUENCY)
    static ELLIPSE_FREQUENCY = parseInt(process.env.REACT_APP_ELLIPSE_FREQUENCY)
    static RING_FREQUENCY = parseInt(process.env.REACT_APP_RING_FREQUENCY)
    static DENSE_CIRCLES_FREQUENCY = parseInt(process.env.REACT_APP_DENSE_CIRCLES_FREQUENCY)
    static DENSE_ELLIPSE_FREQUENCY = parseInt(process.env.REACT_APP_DENSE_ELLIPSE_FREQUENCY)
    static RANDOM_PIXELS_FREQUENCY = parseInt(process.env.REACT_APP_RANDOM_PIXELS_FREQUENCY)
    static RANDOM_EFFECT_FREQUENCY = parseInt(process.env.REACT_APP_RANDOM_EFFECT_FREQUENCY)
    static RANDOM_BLOBS_FREQUENCY = parseInt(process.env.REACT_APP_RANDOM_BLOBS_FREQUENCY)

    static MAX_SHAPE_FILL_PERCENTAGE = parseInt(process.env.REACT_APP_MAX_SHAPE_FILL)

    static COLOR = process.env.REACT_APP_COLOR;

    static getRandomCircle(isDense) {
        const randomRadius = Math.floor(Math.random() * this.IMAGE_WIDTH/4);

        const fillPercentage = Math.floor(Math.random() * this.MAX_SHAPE_FILL_PERCENTAGE);

        const middlePoint = this.getRandomMiddlePoint()

        const color = this.COLOR === "BLACK" ? this.getRandomGrayColour() : this.getRandomColour();

        if(isDense) {
            return new DenseCircle(middlePoint, fillPercentage, color, randomRadius)
        }else{
            return new Circle(middlePoint, fillPercentage, color, randomRadius)
        }
    }

    static getRandomRing() {
        const randomRadius = Math.floor(Math.random() * this.IMAGE_WIDTH/4);

        const fillPercentage = Math.floor(Math.random() * this.MAX_SHAPE_FILL_PERCENTAGE);

        const middlePoint = this.getRandomMiddlePoint()

        const color = this.COLOR === "BLACK" ? this.getRandomGrayColour() : this.getRandomColour();

        return new Ring(middlePoint, fillPercentage, color, randomRadius)
    }

    static getRandomEllipse(isDense) {
        const middlePoint = this.getRandomMiddlePoint()

        const randomHeight = Math.floor(Math.random() * this.IMAGE_HEIGHT/4)
        const randomWidth = Math.floor(Math.random() * this.IMAGE_WIDTH/4)

        const randomAngle = Math.floor(Math.random() * 180)

        const fillPercentage = Math.floor(Math.random() * this.MAX_SHAPE_FILL_PERCENTAGE);

        const color = this.COLOR === "BLACK" ? this.getRandomGrayColour() : this.getRandomColour();

        if(isDense) {
            return new DenseEllipse(middlePoint, fillPercentage, color, randomHeight, randomWidth, randomAngle)
        }else{
            return new Ellipse(middlePoint, fillPercentage, color, randomHeight, randomWidth, randomAngle)
        }
    }

    static getRandomPixels() {
        const fillPercentage = Math.floor(Math.random() * 10);

        const amountOfPixels = fillPercentage * this.IMAGE_WIDTH * this.IMAGE_HEIGHT / 100

        const colour = this.COLOR === "BLACK" ? this.getRandomGrayColour() : this.getRandomColour()

        return new RandomPixels(amountOfPixels, colour)
    }

    static getRandomEffect() {
        return new RandomEffect();
    }

    static getRandomBlobs() {
        const colour = this.COLOR === "BLACK" ? this.getRandomGrayColour() : this.getRandomColour()

        return new RandomBlobs(colour);
    }

    static getRandomDrawable() {
        const shapeNumber = Math.floor(Math.random() * this.RANDOM_BLOBS_FREQUENCY);

        switch(true){
            case shapeNumber < this.RANDOM_EFFECT_FREQUENCY :
                return this.getRandomEffect()
            case shapeNumber < this.RANDOM_PIXELS_FREQUENCY :
                return this.getRandomPixels(false)
            case shapeNumber < this.CIRCLES_FREQUENCY :
                return this.getRandomCircle(false)
            case shapeNumber < this.DENSE_CIRCLES_FREQUENCY :
                return this.getRandomCircle(true)
            case shapeNumber < this.RING_FREQUENCY :
                return this.getRandomRing()
            case shapeNumber < this.ELLIPSE_FREQUENCY :
                return this.getRandomEllipse(false)
            case shapeNumber < this.DENSE_ELLIPSE_FREQUENCY :
                return this.getRandomEllipse(true)
            case shapeNumber < this.RANDOM_BLOBS_FREQUENCY :
                return this.getRandomBlobs()
        }

    }

    static getRandomGrayColour () {
        const opacity = Math.floor(Math.random() * 220);

        return Jimp.rgbaToInt(0, 0, 0, opacity);
    }

    static getRandomColour () {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const a = Math.floor(Math.random() * 255);

        return {r, g, b, a}
    }

    static getRandomMiddlePoint() {
        const randomX = Math.floor(Math.random() * this.IMAGE_WIDTH);
        const randomY = Math.floor(Math.random() * this.IMAGE_HEIGHT);

        return new Point(randomX, randomY)
    }
}

export default DrawableFactory