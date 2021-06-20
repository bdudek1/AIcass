class DrawableAdapter {

    constructor() {

    }

    drawPixel(colour, point, image) {
        image.setPixelColor(colour, point.getX(), point.getY());
    }

    draw(image) {

    }

}

export default DrawableAdapter;