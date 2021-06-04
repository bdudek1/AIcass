import Shape from './Shape';

class Circle extends Shape {
    radius;

    constructor(middlePoint, fillPercentage, colour, radius){
        super(middlePoint, fillPercentage, colour)

        this.radius = radius;
    }

    getRadius() {
        return this.radius;
    }

}

export default Circle;