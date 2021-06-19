import Circle from './Circle';
import Point from "./Point";

import MathUtils from "../utils/MathUtils"

class DenseCircle extends Circle {
    denseFactor;

    constructor(middlePoint, fillPercentage, colour, radius) {
        super(middlePoint, fillPercentage, colour, radius);

        this.denseFactor = Math.random()*3 + 2;
    }

    draw(image) {
        const amountOfPixels = 3.14 * this.getRadius() * this.getRadius() * this.getFillPercentage()/100 *1.3;

        let pixelsDrawn = 0;
        while(pixelsDrawn < amountOfPixels){
                let randomX = Math.floor(Math.random()**this.denseFactor * this.getRadius() * 2) - this.getRadius() * Math.random()**this.denseFactor + this.getMiddlePoint().getX();
                let randomY = Math.floor(Math.random()**this.denseFactor * this.getRadius() * 2) - this.getRadius() * Math.random()**this.denseFactor + this.getMiddlePoint().getY();
                let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the this, if not new one generated
            while(MathUtils.getDistanceBetweenPoints(randomPoint, this.middlePoint) > this.radius){
                randomX = Math.floor(Math.random()**this.denseFactor * this.getRadius() * 2) - this.getRadius() * Math.random()**this.denseFactor + this.getMiddlePoint().getX();
                randomY = Math.floor(Math.random()**this.denseFactor * this.getRadius() * 2) - this.getRadius() * Math.random()**this.denseFactor + this.getMiddlePoint().getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(this.getColour(), randomPoint, image)

            pixelsDrawn++;
        }
    }
}

export default DenseCircle;