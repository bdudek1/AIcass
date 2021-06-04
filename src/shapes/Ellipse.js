import Shape from './Shape';

class Ellipse extends Shape {
    height;
    width;
    angle;

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

}

export default Ellipse;