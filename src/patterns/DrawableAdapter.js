import Jimp from 'jimp';

import BrushTap from '../shapes/BrushTap';

class DrawableAdapter {

    MINIMUM_POINT_RADIUS = parseInt(process.env.REACT_APP_MINIMUM_POINT_RADIUS)
    MAXIMUM_POINT_RADIUS = parseInt(process.env.REACT_APP_MAXIMUM_POINT_RADIUS)
    MINIMUM_OPACITY_FACTOR_PERCENTAGE = parseInt(process.env.REACT_APP_MINIMUM_OPACITY_FACTOR_PERCENTAGE)
    MAXIMUM_OPACITY_FACTOR_PERCENTAGE = parseInt(process.env.REACT_APP_MAXIMUM_OPACITY_FACTOR_PERCENTAGE)

    constructor() {

    }

    drawPixel(color, point, image) {
        const currentPixelColor = Jimp.intToRGBA(image.getPixelColor(point.getX(), point.getY()))

        image.setPixelColor(this.mixColors(color, currentPixelColor), point.getX(), point.getY());

        const pointsRadius = Math.floor(Math.random() * (this.MAXIMUM_POINT_RADIUS - 1)) + this.MINIMUM_POINT_RADIUS;
        const pointsOpacity = Math.floor(Math.random() * this.MAXIMUM_OPACITY_FACTOR_PERCENTAGE) / 100 + this.MINIMUM_OPACITY_FACTOR_PERCENTAGE / 100;

        this.drawSurroundingPoints(new BrushTap(point, pointsRadius, pointsOpacity).getPointsToPaint(), color, image)
    }

    
    draw(image) {

    }

    mixColors(desiredColor, currentColor) {
        const opacitySum = desiredColor.a + currentColor.a

        const desiredOpacityFactor = desiredColor.a/opacitySum
        const currentOpacityFactor = currentColor.a/opacitySum

        const r = Math.round((desiredColor.r*desiredOpacityFactor/2 + currentColor.r*currentOpacityFactor))
        const g = Math.round((desiredColor.g*desiredOpacityFactor/2 + currentColor.g*currentOpacityFactor))
        const b = Math.round((desiredColor.b*desiredOpacityFactor/2 + currentColor.b*currentOpacityFactor))
        const a = Math.round((desiredColor.a + currentColor.a)/2)

        return Jimp.rgbaToInt(r, g, b, a)
    }

    drawSurroundingPoints(surroundingPoints, color, image) {
        for (const entry of surroundingPoints.entries()) {

            const point = entry[0];
            const opacityFactor = entry[1];

            const modifiedColor = {...color, a: color.a*opacityFactor}

            const currentPixelColor = Jimp.intToRGBA(image.getPixelColor(point.getX(), point.getY()))

            image.setPixelColor(this.mixColors(modifiedColor, currentPixelColor), point.getX(), point.getY());

        }
    }

}

export default DrawableAdapter;