class Shape {
    middlePoint;
    fillPercentage;
    colour;

    constructor(middlePoint, fillPercentage, colour) {
        this.middlePoint = middlePoint;
        this.fillPercentage = fillPercentage;
        this.colour = colour;
    }

    getMiddlePoint() {
        return this.middlePoint; 
    }

    getFillPercentage() {
        return this.fillPercentage;
    }

    getColour() {
        return this.colour;
    }

    drawPixel(colour, point, image) {
        image.setPixelColor(colour, point.getX(), point.getY());
    }

    draw(image) {

    }
  
}

export default Shape;