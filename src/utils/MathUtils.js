class MathUtils{

    static getDistanceBetweenPoints(point1, point2) {
        return Math.sqrt(Math.pow(point1.getX() - point2.getX(), 2) + Math.pow(point1.getY() - point2.getY(), 2))
    }

    static getDistanceToTwoPoints(point1, point2, point3) {
        return this.getDistanceBetweenPoints(point1, point2) + this.getDistanceBetweenPoints(point1, point3)
    }

}

export default MathUtils;