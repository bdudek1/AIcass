import Shape from './Shape';
import MathUtils from '../utils/MathUtils';
import Point from '../shapes/Point';

class Circle extends Shape {
    radius;

    constructor(middlePoint, fillPercentage, colour, radius){
        super(middlePoint, fillPercentage, colour)

        this.radius = radius;
    }

    getRadius() {
        return this.radius;
    }

    draw(image) {
        const amountOfPixels = 3.14 * this.getRadius() * this.getRadius() * this.getFillPercentage()/100;

        let pixelsDrawn = 0;
        while(pixelsDrawn < amountOfPixels){
                let randomX = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getX();
                let randomY = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getY();
                let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the circle, if not new one generated
            while(MathUtils.getDistanceBetweenPoints(randomPoint, this.middlePoint) > this.radius){
                randomX = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getX();
                randomY = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(this.getColour(), randomPoint, image)

            pixelsDrawn++;
        }
    }

}

export default Circle;