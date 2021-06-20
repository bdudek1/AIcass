import Shape from './Shape';
import MathUtils from '../utils/MathUtils';
import Point from '../shapes/Point';

class Ellipse extends Shape {
    height;
    width;
    angle;

    MINIMUM_WIDTH = 25;

    constructor(middlePoint, fillPercentage, colour, height, width, angle){
        super(middlePoint, fillPercentage, colour)
        
        this.height = height;
        this.width = width;
        this.angle = angle;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getAngle() {
        return this.angle;
    }

    setHeight(height){
        this.height = height;
    }

    setWidth(width){
        this.width = width;
    }

    draw(image) {

        if(this.getWidth() < this.MINIMUM_WIDTH){
            return;
        }

        const amountOfPixels = 3.14*(this.getHeight()/2)*(this.getWidth()/2)*this.getFillPercentage()/100;

        if(this.getHeight() > this.getWidth()){
            const bufHeight = this.getHeight();
            this.setHeight(this.getWidth());
            this.setWidth(bufHeight);
        }

        const radiansAngle = this.getAngle()*3.14/180;
        
        const distanceBetweenFocals = Math.sqrt(Math.pow(this.getWidth()/2, 2) - Math.pow(this.getHeight()/2, 2))

        const focal1 = new Point(this.getMiddlePoint().getX() - distanceBetweenFocals*Math.cos(radiansAngle), this.getMiddlePoint().getY() - distanceBetweenFocals*Math.sin(radiansAngle))
        const focal2 = new Point(this.getMiddlePoint().getX() + distanceBetweenFocals*Math.cos(radiansAngle), this.getMiddlePoint().getY() + distanceBetweenFocals*Math.sin(radiansAngle))

        const rectWidth = this.getWidth() + this.getHeight()
        const rectHeight = this.getHeight() + this.getWidth()

        const maxDistanceToFocals = this.getWidth()

        let pixelsDrawn = 0

        while(pixelsDrawn < amountOfPixels){
            let randomX = Math.floor(Math.random() * rectWidth) - rectWidth/2 + this.getMiddlePoint().getX();
            let randomY = Math.floor(Math.random() * rectHeight) - rectHeight/2 + this.getMiddlePoint().getY();
            let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the ellipse, if not new one generated
            while(MathUtils.getDistanceToTwoPoints(randomPoint, focal1, focal2) > maxDistanceToFocals) {
                randomX = Math.floor(Math.random() * rectWidth) - rectWidth/2+ this.getMiddlePoint().getX();
                randomY = Math.floor(Math.random() * rectHeight) - rectHeight/2 + this.getMiddlePoint().getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(this.getColour(), randomPoint, image)

            pixelsDrawn++;
        }
    }

}

export default Ellipse;