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
  
}

export default Shape;