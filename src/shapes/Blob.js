import ImageUtils from "../utils/ImageUtils";

import Shape from "./Shape";
import Point from "./Point";

class Blob extends Shape {
    IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)
    IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)

    pixelsAmount;

    constructor(middlePoint, fillPercentage, colour, pixelsAmount){
        super(middlePoint, null, colour)

        this.pixelsAmount = pixelsAmount;
    }

    draw(image) {
        let pixelsDrawn = 0;
        let nextPoint = this.middlePoint;

        while(pixelsDrawn < this.pixelsAmount){
            this.drawPixel(this.getColour(), nextPoint, image)

            pixelsDrawn++;

            nextPoint = this.getNextPoint(image, nextPoint, this.getColour())
        }

    }

    getNextPoint(image, nextPoint, color){
        let point = nextPoint

        while(ImageUtils.isPointThisColor(image, point, color)){
            if(point.getX() < 1 || point.getY() < 1 || point.getX() > this.IMAGE_WIDTH || point.getY() > this.IMAGE_HEIGHT){
                break;
            }

            switch(this.getRandomDirection()){
                case "UP":
                    point = new Point(point.getX(), point.getY() - 1);
                    break;
                case "DOWN":
                    point = new Point(point.getX(), point.getY() + 1);
                    break;
                case "LEFT":
                    point = new Point(point.getX() - 1, point.getY());
                    break;
                case "RIGHT":
                    point = new Point(point.getX() + 1, point.getY());
                    break;
             }

             //console.log(point)
        }

        return point;
    }

    getRandomDirection() {
        let directionNumber = Math.floor(Math.random() * 4) + 1

        switch(directionNumber){
            case 1:
                return "UP";
            case 2:
                return "DOWN";
            case 3:
                return "LEFT";
            case 4:
                return "RIGHT";
        }

    }

}

export default Blob