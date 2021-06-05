import Jimp from 'jimp';

import AiManager from '../utils/AiManager';
import MathUtils from '../utils/MathUtils';
import Point from '../shapes/Point';

class ChimpanzeeWithBrush {
    IMAGE_TENSOR_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_TENSOR_HEIGHT)
    IMAGE_TENSOR_WIDTH = parseInt(process.env.REACT_APP_IMAGE_TENSOR_WIDTH)

    IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)
    IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)

    image;
    imageTensor;

    predictionImageMap = new Map();

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

    drawRandomPixels(amount, colour) {
        let i = 0
        while(i < amount){
            const randomX = Math.floor(Math.random() * this.IMAGE_HEIGHT)
            const randomY = Math.floor(Math.random() * this.IMAGE_WIDTH)
            const randomPoint = new Point(randomX, randomY)

            this.drawPixel(colour, randomPoint)

            i++
        }
    }

    drawCircle(circle) {
        const amountOfPixels = 3.14 * circle.getRadius() * circle.getRadius() * circle.getFillPercentage()/100;

        let pixelsDrawn = 0;
        while(pixelsDrawn < amountOfPixels){
                let randomX = Math.floor(Math.random() * circle.getRadius() * 2) - circle.getRadius() + circle.getMiddlePoint().getX();
                let randomY = Math.floor(Math.random() * circle.getRadius() * 2) - circle.getRadius() + circle.getMiddlePoint().getY();
                let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the circle, if not new one generated
            while(MathUtils.getDistanceBetweenPoints(randomPoint, circle.middlePoint) > circle.radius){
                randomX = Math.floor(Math.random() * circle.getRadius() * 2) - circle.getRadius() + circle.getMiddlePoint().getX();
                randomY = Math.floor(Math.random() * circle.getRadius() * 2) - circle.getRadius() + circle.getMiddlePoint().getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(circle.getColour(), randomPoint)

            pixelsDrawn++;
        }
    }

    drawEllipse(ellipse) {
        const amountOfPixels = 3.14*(ellipse.getHeight()/2)*(ellipse.getWidth()/2)*ellipse.getFillPercentage()/100;
        
        const distanceBetweenFocals = Math.sqrt(Math.pow(ellipse.getWidth()/2, 2) - Math.pow(ellipse.getHeight()/2, 2))
        const focal1 = new Point(ellipse.getMiddlePoint().getX() - distanceBetweenFocals, ellipse.getMiddlePoint().getY())
        const focal2 = new Point(ellipse.getMiddlePoint().getX() + distanceBetweenFocals, ellipse.getMiddlePoint().getY())

        const maxDistanceToFocals = ellipse.getWidth()

        let pixelsDrawn = 0
        while(pixelsDrawn < amountOfPixels){
            let randomX = Math.floor(Math.random() * ellipse.getWidth()) - ellipse.getWidth()/2 + ellipse.getMiddlePoint().getX();
            let randomY = Math.floor(Math.random() * ellipse.getHeight()) - ellipse.getHeight()/2 + ellipse.getMiddlePoint().getY();
            let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the ellipse, if not new one generated
            while(MathUtils.getDistanceToTwoPoints(randomPoint, focal1, focal2) > maxDistanceToFocals){
                randomX = Math.floor(Math.random() * ellipse.getWidth()) - ellipse.getWidth()/2 + ellipse.getMiddlePoint().getX();
                randomY = Math.floor(Math.random() * ellipse.getHeight()) - ellipse.getHeight()/2 + ellipse.getMiddlePoint().getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(ellipse.getColour(), randomPoint)

            pixelsDrawn++;
        }
    }

    drawLeaningEllipse(ellipse) {
        const amountOfPixels = 3.14*(ellipse.getHeight()/2)*(ellipse.getWidth()/2)*ellipse.getFillPercentage()/100;

        if(ellipse.getHeight() > ellipse.getWidth()){
            const bufHeight = ellipse.getHeight();
            ellipse.setHeight(ellipse.getWidth());
            ellipse.setWidth(bufHeight);
        }

        const radiansAngle = ellipse.getAngle()*3.14/180;
        
        const distanceBetweenFocals = Math.sqrt(Math.pow(ellipse.getWidth()/2, 2) - Math.pow(ellipse.getHeight()/2, 2))

        const focal1 = new Point(ellipse.getMiddlePoint().getX() - distanceBetweenFocals*Math.cos(radiansAngle), ellipse.getMiddlePoint().getY() - distanceBetweenFocals*Math.sin(radiansAngle))
        const focal2 = new Point(ellipse.getMiddlePoint().getX() + distanceBetweenFocals*Math.cos(radiansAngle), ellipse.getMiddlePoint().getY() + distanceBetweenFocals*Math.sin(radiansAngle))

        const rectWidth = ellipse.getWidth() + ellipse.getHeight()
        const rectHeight = ellipse.getHeight() + ellipse.getWidth()

        const maxDistanceToFocals = ellipse.getWidth()

        let pixelsDrawn = 0

        while(pixelsDrawn < amountOfPixels){
            let randomX = Math.floor(Math.random() * rectWidth) - rectWidth/2 + ellipse.getMiddlePoint().getX();
            let randomY = Math.floor(Math.random() * rectHeight) - rectHeight/2 + ellipse.getMiddlePoint().getY();
            let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the ellipse, if not new one generated
            while(MathUtils.getDistanceToTwoPoints(randomPoint, focal1, focal2) > maxDistanceToFocals) {
                randomX = Math.floor(Math.random() * rectWidth) - rectWidth/2+ ellipse.getMiddlePoint().getX();
                randomY = Math.floor(Math.random() * rectHeight) - rectHeight/2 + ellipse.getMiddlePoint().getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(ellipse.getColour(), randomPoint)

            pixelsDrawn++;
        }
    }

    drawPixel(colour, point) {
        this.getImage().setPixelColor(colour, point.getX(), point.getY());
    }

    randomEffect() {
        const randomEffectNumber = Math.random()*9;
        switch(true){
            case randomEffectNumber < 1 :
                this.setImage(this.getImage().sepia());
                break;
            case randomEffectNumber < 2 :
                this.setImage(this.getImage().dither565());
                break;
            case randomEffectNumber < 3 :
                const brightness = Math.random()*2 - 1;
                this.setImage(this.getImage().brightness(brightness));
                break;
            case randomEffectNumber < 4 :
                const contrast = Math.random()*2 - 1;
                this.setImage(this.getImage().contrast(contrast));
                break;
            case randomEffectNumber < 5 :
                this.setImage(this.getImage().normalize())
                break;
            case randomEffectNumber < 6 :
                const posterizeFactor = Math.floor(Math.random()*250 + 1)
                this.setImage(this.getImage().posterize(posterizeFactor))
                break;
            case randomEffectNumber < 7 :
                const blurFactor = Math.floor(Math.random()*2 + 1)
                this.setImage(this.getImage().blur(blurFactor))
                break;
            case randomEffectNumber < 8 :
                const gaussFactor = Math.floor(Math.random()*3 + 1)
                this.setImage(this.getImage().gaussian(gaussFactor))
                break;
            case randomEffectNumber < 9 :
                const pixelateFactor = Math.random()*10
                this.setImage(this.getImage().pixelate(pixelateFactor))
                break;
        }
        
    }

    setImage(image) {
        this.image = image
    }

    getImage() {
        return this.image
    }

    getBase64Image() {
        return new Promise(resolve => {
            this.getImage().getBase64Async(Jimp.AUTO).then(img => {
                resolve(img);
            })
        })
    }

    getPredictionImageMap() {
        return this.predictionImageMap;
    }

    clearPredictionImageMap() {
        this.predictionImageMap.clear();
    }

    async getViewPrediction() {
        const t1 = performance.now()

        return new Promise(async (resolve) => {
            this.getImage().getBufferAsync(Jimp.MIME_PNG).then(image => {
                AiManager.classifyDrawnImage(image).then(classification => {
                    console.log(classification)

                    this.getBase64Image().then(img => {
                        this.predictionImageMap.set(classification, img);
                    })

                    const t2 = performance.now()

                    console.log(`CONVERTING IMAGE TO TENSOR AND PREDICTING IF IT IS A VIEW DONE IN ${t2 - t1} [MS]`)

                    resolve(classification)
                })
            })
        })
    }

}

export default ChimpanzeeWithBrush