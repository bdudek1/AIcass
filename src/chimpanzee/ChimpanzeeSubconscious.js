import ShapeBuilder from './ShapeBuilder';

class ChimpanzeeSubconscious {
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
            case shapeNumber < 6 :
                const randomPixels = ShapeBuilder.getRandomPixels()
                this.getChimpanzee().drawRandomPixels(randomPixels.amountOfPixels, randomPixels.colour)
                break;
            case shapeNumber < 15 :
                const randomCircle = ShapeBuilder.getCircle()
                this.getChimpanzee().drawCircle(randomCircle.point, randomCircle.radius, randomCircle.fillPercentage, randomCircle.colour)
                break;
            case shapeNumber < 101 :
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

    drawAndPickBest(numberOfTries) {
        return new Promise(resolve => {
            let i = 0;

            while(i < numberOfTries) {
                const brushStrokes = Math.floor(Math.random() * 35) + 10;
                this.drawRandomShapes(brushStrokes)

                this.chimpanzee.getViewPrediction().then(pred => {
                    if(pred > this.bestViewPrediction){
                        this.bestViewPrediction = pred;
                        this.bestImage = this.chimpanzee.getImage()
                    }
                })

                i++;
            }

            console.log(`BEST PREDICTION: ${this.bestViewPrediction}`)
            resolve({bestImage: this.bestImage, bestPrediction: this.bestPrediction ? this.bestPrediction : 0})
        })

    }
}

export default ChimpanzeeSubconscious