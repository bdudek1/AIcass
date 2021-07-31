import Jimp from 'jimp';

import AiManager from '../utils/AiManager';

class ChimpanzeeWithBrush {
    IMAGE_TENSOR_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_TENSOR_HEIGHT)
    IMAGE_TENSOR_WIDTH = parseInt(process.env.REACT_APP_IMAGE_TENSOR_WIDTH)

    IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)
    IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)

    image;
    imageTensor;

    bestImage;
    bestPrediction = 0;

    constructor() {

    }

    build(image) {
        return new Promise(resolve => {
            if(image){
                Jimp.read(image).then(jimpImage => {
                    resolve(jimpImage)
                })
            }else{
                new Jimp(this.IMAGE_HEIGHT, this.IMAGE_WIDTH, 'white', (error, jimpImage) => {
                        resolve(jimpImage)
                });
            }
        })

    }

    setImage(image) {
        this.image = image
    }

    getImage() {
        return this.image
    }

    getBase64Image() {
        return new Promise(resolve => {
            this.getImage().getBase64Async(Jimp.MIME_JPEG).then(img => {
                resolve(img);
            })
        })
    }

    getBestPrediction() {
        return this.bestPrediction;
    }

    setBestPrediction(prediction) {
        this.bestPrediction = prediction;
    }

    getBestImage() {
        return this.bestImage;
    }

    setBestImage(image) {
        this.bestImage = image;
    }

    getViewPrediction() {
        const t1 = performance.now()

        return new Promise((resolve) => {
            this.getImage().getBufferAsync(Jimp.MIME_JPEG).then(image => {
                AiManager.classifyDrawnImage(image).then(classification => {

                    if(classification > this.bestPrediction){
                        this.getBase64Image().then(img => {
                            this.setBestPrediction(classification)
                            this.setBestImage(img)
                        })
                    }

                    const t2 = performance.now()

                    //console.log(`CONVERTING IMAGE TO TENSOR AND PREDICTING IF IT IS A VIEW DONE IN ${t2 - t1} [MS]`)

                    resolve(classification)
                })
            })
        })
    }

}

export default ChimpanzeeWithBrush