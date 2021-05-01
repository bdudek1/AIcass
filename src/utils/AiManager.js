import { trackPromise } from 'react-promise-tracker';

import ImageUtils from './ImageUtils';
import ViewClasses from './ViewClasses';
import DatabaseManager from './DatabaseManager';

import labels from './imagenet_labels.json';

import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

class AiManager{
    model = undefined;
    mobilenetModel = undefined;

    constructor() {
        this.loadModel()
    }

    loadModel() {
        this.loadMobilenetModel();
        DatabaseManager.getModel().then(model => {
            this.model = model
        }).catch(error => {
            console.log(error)
        })
    }

    loadMobilenetModel() {
        this.loadMobilenet().then(model => {
            this.mobilenetModel = model;
        }).catch(error => {
            console.log(error)
        })
    }

    getModel() {
        return this.model;
    }

    classifyImage(file) {
        const prediction = this.mobilenetModel.predict(file.tensor);
        const highestPredictions = this.getHighestPredictions(prediction, 10);     
        console.log(highestPredictions);

        return ViewClasses.getViewClassification(highestPredictions);
    }

    classifyLoadedImages(list) {
        tf.tidy(() => {

            list.forEach(file => {
                if(!file.tensor){
                    trackPromise(
                        ImageUtils.loadImage(file).then(image => {
                            file.tensor = ImageUtils.convertImageToTensor(image);
                            file.viewPrediction = this.classifyImage(file);
                            file.isView = file.viewPrediction > 0.5 ? true : false;

                            console.log(file.viewPrediction);
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

    async trainModelByFileList(files, showDialog) {

        tf.tidy(() => {
            trackPromise(
                DatabaseManager.getModel().then(mod => {
                    this.compileModel(mod)

                    const data = [];
                    const labels = [];

                    files.forEach(file => { 
                        data.push(tf.squeeze(file.tensor))
                        labels.push(tf.squeeze(tf.oneHot(tf.tensor1d([file.isView ? 1 : 0], 'int32'), 2)))
                    })

                    mod.fit(tf.stack(data), tf.stack(labels), {
                        epochs: 1,
                        batchSize: 1,
                        callbacks: this.createTfVisCallback(data.length)
                   }).then((a) => {
                       DatabaseManager.setAiModel(mod)
                       showDialog(true)
                   })

                })
            )
        })

    }

    createTfVisCallback(size) {
        const metrics = ['acc'];
        const container = {
          name: `AIcasso - training on ${size} images`, styles: { height: '330px' }
        };
        const options = {xLabel: "Image number",
                         yLabel: "1 - View | 0 - Not View",
                         yType: "nominal",
                         xType: "nominal",
                         zoomToFit: true,
                         seriesColors: ["#33B7EE"],
                         callbacks:["onBatchEnd"]}
        
        const fitCallbacks = tfvis.show.fitCallbacks(container, metrics, options)

        return fitCallbacks
    }
    

    compileModel(model) {
        tf.tidy(() => {
            const optimizer = tf.train.adam();
            model.compile({
                optimizer: optimizer,
                loss: 'categoricalCrossentropy',
                metrics: ['accuracy'],
            });
        })
    }

    loadMobilenet() { 
        return tf.loadLayersModel(process.env.REACT_APP_MOBILENET_PATH);
    }

}

const aiManagerInstance = new AiManager();
Object.seal(aiManagerInstance)

export default aiManagerInstance;