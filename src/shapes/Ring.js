import Circle from "./Circle";
import MathUtils from '../utils/MathUtils';
import Point from './Point';

class Ring extends Circle {
    innerRadius;

    getInnerRadius() {
        return this.innerRadius;
    }

    constructor(middlePoint, fillPercentage, colour, radius) {
        super(middlePoint, fillPercentage, colour, radius);

        this.innerRadius = Math.floor(Math.random() * this.getRadius())
    }

    draw(image) {
        if(this.getRadius() - this.getInnerRadius() < 5){
            return;
        }

        const amountOfPixels = (3.14 * this.getRadius() * this.getRadius() - 3.14 * this.getInnerRadius() * this.getInnerRadius()) * this.getFillPercentage()/130

        let pixelsDrawn = 0;
        while(pixelsDrawn < amountOfPixels){
                let randomX = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getX();
                let randomY = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getY();
                let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the bow, if not new one generated
            while(MathUtils.getDistanceBetweenPoints(randomPoint, this.middlePoint) > this.getRadius() ||
                  MathUtils.getDistanceBetweenPoints(randomPoint, this.middlePoint) < this.getInnerRadius()){

                randomX = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getX();
                randomY = Math.floor(Math.random() * this.getRadius() * 2) - this.getRadius() + this.getMiddlePoint().getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(this.getColour(), randomPoint, image)

            pixelsDrawn++;
        }
    }
}

export default Ring;