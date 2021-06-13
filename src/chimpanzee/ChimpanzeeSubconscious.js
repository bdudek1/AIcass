import ShapeFactory from '../shapes/ShapeFactory';
import ChimpanzeeWithBrush from '../chimpanzee/ChimpanzeeWithBrush';

class ChimpanzeeSubconscious {
    MAX_BRUSH_STROKES = parseInt(process.env.REACT_APP_MAX_BRUSH_STROKES)
    MINIMUM_BRUSH_STROKES = parseInt(process.env.REACT_APP_MIN_BRUSH_STROKES)

    CIRCLES_FREQUENCY = parseInt(process.env.REACT_APP_CIRCLES_FREQUENCY)
    ELLIPSE_FREQUENCY = parseInt(process.env.REACT_APP_ELLIPSE_FREQUENCY)
    RANDOM_PIXELS_FREQUENCY = parseInt(process.env.REACT_APP_RANDOM_PIXELS_FREQUENCY)
    RANDOM_EFFECT_FREQUENCY = parseInt(process.env.REACT_APP_RANDOM_EFFECT_FREQUENCY)


    chimpanzee;

    bestViewPrediction = 0;
    bestImage;

    constructor() {
        this.chimpanzee = new ChimpanzeeWithBrush();
    }

    setChimpanzee(chimpanzee) {
        this.chimpanzee = chimpanzee;
    }

    getChimpanzee() {
        return this.chimpanzee
    }

    drawRandomShape(shapeNumber) {
        switch(true){
            case shapeNumber < this.RANDOM_EFFECT_FREQUENCY :
                this.getChimpanzee().randomEffect()
                break;
            case shapeNumber < this.RANDOM_PIXELS_FREQUENCY :
                const randomPixels = ShapeFactory.getRandomPixels()
                this.getChimpanzee().drawRandomPixels(randomPixels.amountOfPixels, randomPixels.colour)
                break;
            case shapeNumber < this.CIRCLES_FREQUENCY :
                const randomCircle = ShapeFactory.getRandomCircle()
                this.getChimpanzee().drawCircle(randomCircle)
                break;
            case shapeNumber < this.ELLIPSE_FREQUENCY :
                const randomEllipse = ShapeFactory.getRandomEllipse()
                this.getChimpanzee().drawLeaningEllipse(randomEllipse)
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

    drawAndPickBest(numberOfTries) {
        return new Promise(async (resolve) => {
            const t1 = performance.now()
            let i = 0;

            while(i < numberOfTries) {
                const brushStrokes = Math.floor(Math.random() * this.MAX_BRUSH_STROKES - this.MINIMUM_BRUSH_STROKES) + this.MINIMUM_BRUSH_STROKES;

                    this.drawRandomShapes(brushStrokes)

                    await this.getChimpanzee().getViewPrediction().then(pred => {
                        if(pred > this.bestViewPrediction){
                            this.bestViewPrediction = pred;
                            this.bestImage = this.getChimpanzee().getImage()
                        }

                        console.log(i)
                        i++; 
                    })

            }
            
            const t2 = performance.now()

            console.log(`PROCESSING IMAGES CHILDREN DONE IN ${t2 - t1} [MS]`)

            resolve({bestPrediction: this.getChimpanzee().getBestPrediction(), bestImage: this.getChimpanzee().getBestImage()})
        })
    }
}

export default ChimpanzeeSubconscious