import * as tf from '@tensorflow/tfjs';

class ModelBuilder {

    //returns image ai model with 2 classifications (view and non view)
    //224 x 224 image tensor input size
    static buildSequentialModel() {
        const model = tf.sequential();
        
        const IMAGE_WIDTH = 224;
        const IMAGE_HEIGHT = 224;
        const IMAGE_CHANNELS = 3;  
        
        model.add(tf.layers.conv2d({
          inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
          kernelSize: 5,
          filters: 8,
          strides: 1,
          activation: 'relu',
          kernelInitializer: 'varianceScaling'
        }));

        model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
        
        model.add(tf.layers.conv2d({
          kernelSize: 5,
          filters: 16,
          strides: 1,
          activation: 'relu',
          kernelInitializer: 'varianceScaling'
        }));

        model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
        
        model.add(tf.layers.flatten());
      
        const NUM_OUTPUT_CLASSES = 2;
        
        model.add(tf.layers.dense({
          units: NUM_OUTPUT_CLASSES,
          kernelInitializer: 'varianceScaling',
          activation: 'softmax'
        }));
      
        const optimizer = tf.train.adam();
        model.compile({
          optimizer: optimizer,
          loss: 'categoricalCrossentropy',
          metrics: ['accuracy'],
        });

        return model;
    }
    
}

export default ModelBuilder;