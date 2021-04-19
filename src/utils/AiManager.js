import ImageUtils from './ImageUtils';
import ViewClasses from './ViewClasses';
import DatabaseManager from './DatabaseManager';

import labels from './imagenet_labels.json';

import * as tf from '@tensorflow/tfjs';

class AiManager{
    static model;
    static isModelUpToDate = false;

    static setModel() {
        DatabaseManager.getModel().then(model => {
            this.model = model;
            this.isModelUpToDate = true;
            this.compileModel()
        }).catch(error => {
            this.loadMobilenetModel().then(model => {
                this.model = model;
                this.isModelUpToDate = false;
            })
        })
    }

    static classifyImage(file) {
            const prediction = this.model.predict(file.tensor);
            const highestPredictions = this.getHighestPredictions(prediction, 10);     
            console.log(highestPredictions);

            return ViewClasses.getViewClassification(highestPredictions);
    }

    //returns a map which key is classification name and value is probability
    static getHighestPredictions(prediction, predictionsNumber) {
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

    static trainModelByFileList(files) {
        this.setModel();

        if(this.isModelUpToDate) {
            files.forEach(file => {
                console.log(file.tensor)
                // ImageUtils.loadImage(image).then(img => {   
                //     const processedImage = ImageUtils.convertImageToTensor(img);    
                //     console.log(processedImage.toString())
                //     console.log(this.model)
                //     //this.model.trainOnBatch(processedImage, tf.oneHot(tf.tensor1d([1], 'int32'), 1000));
                // });  
            })
        }
    }

    static compileModel() {
        this.model.compile({optimizer: 'adam',
                            loss: 'meanSquaredError'})
    }

    static loadMobilenetModel() { 
        return tf.loadLayersModel(process.env.REACT_APP_MOBILENET_PATH);
    }

}

export default AiManager;