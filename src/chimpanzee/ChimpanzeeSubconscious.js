import DrawableFactory from '../shapes/DrawableFactory';
import ChimpanzeeWithBrush from '../chimpanzee/ChimpanzeeWithBrush';
import RandomEffect from '../shapes/RandomEffect';

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

    drawRandomShapes(numberOfShapes) {
        let i = 0;

        while(i < numberOfShapes) {
            DrawableFactory.getRandomDrawable().draw(this.getChimpanzee().getImage())
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