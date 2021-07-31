import DrawableFactory from '../patterns/DrawableFactory';
import ChimpanzeeWithBrush from '../chimpanzee/ChimpanzeeWithBrush';

class ChimpanzeeSubconscious {
    MAX_BRUSH_STROKES = parseInt(process.env.REACT_APP_MAX_BRUSH_STROKES)
    MINIMUM_BRUSH_STROKES = parseInt(process.env.REACT_APP_MIN_BRUSH_STROKES)

    chimpanzee;

    bestViewPrediction = 0;

    constructor() {
        this.chimpanzee = new ChimpanzeeWithBrush();
    }

    setChimpanzee(chimpanzee) {
        this.chimpanzee = chimpanzee;
    }

    getChimpanzee() {
        return this.chimpanzee
    }

    drawRandomShapesAndGetSteps(numberOfShapes) {
        let i = 0;
        const imageSteps = new Array();

        while(i < numberOfShapes) {
            DrawableFactory.getRandomDrawable().draw(this.getChimpanzee().getImage())
            imageSteps.push(this.getChimpanzee().getImage())
            i++;
        }

        return imageSteps;
    }

    drawAndPickBest(numberOfTries) {
        return new Promise(async (resolve) => {
            const t1 = performance.now()
            let imgSteps = new Array();
            let i = 0;

            while(i < numberOfTries) {
                const brushStrokes = Math.floor(Math.random() * this.MAX_BRUSH_STROKES - this.MINIMUM_BRUSH_STROKES) + this.MINIMUM_BRUSH_STROKES;

                    const imageStepsBuf = this.drawRandomShapesAndGetSteps(brushStrokes)

                    await this.getChimpanzee().getViewPrediction().then(pred => {
                        if(pred > this.bestViewPrediction){
                            this.bestViewPrediction = pred;
                            imgSteps = imageStepsBuf
                        }

                        i++; 
                    })

            }
            
            const t2 = performance.now()

            //console.log(`PROCESSING IMAGES CHILDREN DONE IN ${t2 - t1} [MS]`)

            resolve({bestPrediction: this.getChimpanzee().getBestPrediction(),
                     bestImage: this.getChimpanzee().getBestImage(),
                     imageSteps: imgSteps})
        })
    }
}

export default ChimpanzeeSubconscious