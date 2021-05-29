import ShapeBuilder from './ShapeBuilder';

class ChimpanzeeSubconscious {
    MAX_BRUSH_STROKES = parseInt(process.env.REACT_APP_MAX_BRUSH_STROKES)
    MINIMUM_BRUSH_STROKES = parseInt(process.env.REACT_APP_MIN_BRUSH_STROKES)

    CIRCLES_FREQUENCY = parseInt(process.env.REACT_APP_CIRCLES_FREQUENCY)
    ELLIPSE_FREQUENCY = parseInt(process.env.REACT_APP_ELLIPSE_FREQUENCY)
    RANDOM_FREQUENCY = parseInt(process.env.REACT_APP_RANDOM_PIXELS_FREQUENCY)

    chimpanzee;

    bestViewPrediction = 0;
    bestImage;

    constructor(chimpanzee) {
        this.chimpanzee = chimpanzee;
    }

    setChimpanzee(chimpanzee) {
        this.chimpanzee = chimpanzee;
    }

    getChimpanzee() {
        return this.chimpanzee
    }

    drawRandomShape(shapeNumber) {
        switch(true){
            case shapeNumber < this.RANDOM_FREQUENCY :
                const randomPixels = ShapeBuilder.getRandomPixels()
                this.getChimpanzee().drawRandomPixels(randomPixels.amountOfPixels, randomPixels.colour)
                break;
            case shapeNumber < this.CIRCLES_FREQUENCY :
                const randomCircle = ShapeBuilder.getCircle()
                this.getChimpanzee().drawCircle(randomCircle.point, randomCircle.radius, randomCircle.fillPercentage, randomCircle.colour)
                break;
            case shapeNumber < this.ELLIPSE_FREQUENCY :
                const randomEllipse = ShapeBuilder.getEllipse()
                this.getChimpanzee().drawLeaningEllipse(randomEllipse.height, randomEllipse.width, randomEllipse.point, randomEllipse.angle, randomEllipse.fillPercentage, randomEllipse.colour)
                break;
        }
    }

    drawRandomShapes(numberOfShapes) {
        let i = 0;

        while(i < numberOfShapes) {
            const shapeNumber = Math.floor(Math.random() * 100);
            this.drawRandomShape(shapeNumber)

            i++;
        }

    }

    async drawAndPickBest(numberOfTries) {
        return new Promise(async (resolve) => {
            let i = 0;

            while(i < numberOfTries) {
                const brushStrokes = Math.floor(Math.random() * this.MAX_BRUSH_STROKES - this.MINIMUM_BRUSH_STROKES) + this.MINIMUM_BRUSH_STROKES;
                this.drawRandomShapes(brushStrokes)

                await this.chimpanzee.getViewPrediction().then(pred => {
                    if(pred > this.bestViewPrediction){
                        this.bestViewPrediction = pred;
                        this.bestImage = this.chimpanzee.getImage()
                    }
                })

                i++;
            }

            resolve(this.chimpanzee.getPredictionImageMap())
        })
    }
}

export default ChimpanzeeSubconscious