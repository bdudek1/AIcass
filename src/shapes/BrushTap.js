import Point from "./Point";
import MathUtils from '../utils/MathUtils';

class BrushTap {
    middlePoint;
    radius;
    opacityFactor;

    constructor(middlePoint, radius, opacityFactor) {
        this.middlePoint = middlePoint;
        this.radius = radius;
        this.opacityFactor = opacityFactor;
    }

    getPointsToPaint() {
        const pointsOpacityMap = new Map();

        for(let i = -this.radius; i < this.radius; i++) {

            for(let j = -this.radius; j < this.radius; j++) {
                if( (i === 0 && j === 0)  || Math.abs(i) + Math.abs(j) > this.radius){
                    continue;
                }

                const currentPoint = new Point(this.middlePoint.getX() - i, this.middlePoint.getY() - j)

                const pointOpacityFactor = this.opacityFactor ** Math.round(MathUtils.getDistanceBetweenPoints(currentPoint, this.middlePoint));

                pointsOpacityMap.set(currentPoint, pointOpacityFactor)
            }

        }

        return pointsOpacityMap;
    }


}

export default BrushTap;