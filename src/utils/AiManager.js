import { trackPromise } from 'react-promise-tracker';

import ImageUtils from './ImageUtils';
import ViewClasses from './ViewClasses';

import labels from './imagenet_labels.json';

import * as tf from '@tensorflow/tfjs';

class AiManager{
    mobilenetModel = undefined;

    loadMobilenetModel() {
        return new Promise(resolve => {
            this.loadMobilenet().then(model => {
                this.mobilenetModel = model;
                resolve(model)
            }).catch(error => {
                resolve(error)
            })
        })
    }

    getPrediction(file) {
        return this.mobilenetModel.predict(file.tensor);
    }

    getHighestClassification(prediction) {
        const highestPrediction = this.getHighestPredictions(prediction, 1);     
        const highestPredictionArray = Array.from(highestPrediction, ([name, value]) => ({ name, value }));

        console.log(highestPredictionArray[0].name)
        return {name: highestPredictionArray[0].name, value: highestPredictionArray[0].value}
    }

    classifyImage(prediction) {
        const highestPredictions = this.getHighestPredictions(prediction, 10);     

        return ViewClasses.getViewClassification(highestPredictions);
    }

    async classifyLoadedImages(list) {
        if(!this.mobilenetModel){
           await this.loadMobilenetModel()
        }

        tf.tidy(() => {

            list.forEach(file => {
                if(!file.tensor){
                    trackPromise(
                        ImageUtils.loadImage(file).then(image => {
                            file.image = image
                            file.tensor = ImageUtils.convertImageToTensor(image);

                            const prediction = this.getPrediction(file)
                            file.viewPrediction = this.classifyImage(prediction);
                            file.highestPrediction = this.getHighestClassification(prediction)
                            file.isView = file.viewPrediction > 0.5 ? true : false;
                        })
                    )
                }
            })

        })
    }

        //returns a map which key is classification name and value is probability
    getHighestPredictions(prediction, predictionsNumber) {
        const predictionValues = prediction.as1D()
                                            .dataSync()
                                               
        const maxValues = new Map()
    
        while(predictionsNumber > 0){
            let maxPrediction = 0;
            let maxPredictionIndex = 0;
            let currentPredictionIndex = 0;
    
            predictionValues.forEach(pred => {
                if(maxPrediction < pred && !maxValues.has(labels[currentPredictionIndex])){
                    maxPrediction = pred;
                    maxPredictionIndex = currentPredictionIndex;
                }
                currentPredictionIndex++;
            })
    
            maxValues.set(labels[maxPredictionIndex], maxPrediction);
            predictionsNumber--;
        }
    
        return maxValues;
    }

    loadMobilenet() { 
        return tf.loadLayersModel(process.env.REACT_APP_MOBILENET_PATH);
    }

}

const aiManagerInstance = new AiManager();
Object.seal(aiManagerInstance)

export default aiManagerInstance;