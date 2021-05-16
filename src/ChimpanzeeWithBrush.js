import Jimp from 'jimp';

import MathUtils from './utils/MathUtils';
import Point from './utils/Point';

class ChimpanzeeWithBrush {
    IMAGE_TENSOR_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_TENSOR_HEIGHT)
    IMAGE_TENSOR_WIDTH = parseInt(process.env.REACT_APP_IMAGE_TENSOR_WIDTH)

    IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)
    IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)

    BLACK = Jimp.rgbaToInt(0, 0, 0, 255);

    image;
    imageTensor;

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

    drawRandomPixels(colour, amount) {
        let i = 0
        while(i < amount){
            const randomX = Math.floor(Math.random() * this.IMAGE_HEIGHT)
            const randomY = Math.floor(Math.random() * this.IMAGE_WIDTH)
            const randomPoint = new Point(randomX, randomY)

            this.drawPixel(colour, randomPoint)

            i++
        }
    }

    drawRandomPixels(amount) {
        let pixelsDrawn = 0

        while(pixelsDrawn < amount){
            const randomX = Math.floor(Math.random() * 512)
            const randomY = Math.floor(Math.random() * 512)
            const randomPoint = new Point(randomX, randomY)

            const randomR = Math.floor(Math.random() * 255)
            const randomG = Math.floor(Math.random() * 255)
            const randomB = Math.floor(Math.random() * 255)

            const randomOpacity =  Math.floor(Math.random() * 255)

            this.drawPixel(Jimp.rgbaToInt(randomR, randomG, randomB, randomOpacity), randomPoint)

            pixelsDrawn++
        }
    }

    drawCircle(middlePoint, radius, fillPercentage) {
        const amountOfPixels = 3.14*radius*radius*fillPercentage/100;

        let pixelsDrawn = 0;
        while(pixelsDrawn < amountOfPixels){
                let randomX = Math.floor(Math.random() * radius * 2) - radius + middlePoint.getX();
                let randomY = Math.floor(Math.random() * radius * 2) - radius + middlePoint.getY();
                let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the circle, if not new one generated
            while(MathUtils.getDistanceBetweenPoints(randomPoint, middlePoint) > radius){
                randomX = Math.floor(Math.random() * radius * 2) - radius + middlePoint.getX();
                randomY = Math.floor(Math.random() * radius * 2) - radius + middlePoint.getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(this.BLACK, randomPoint)

            pixelsDrawn++;
        }
    }

    drawEllipse(height, width, middlePoint, fillPercentage) {
        const amountOfPixels = 3.14*(height/2)*(width/2)*fillPercentage/100;
        
        const distanceBetweenFocals = Math.sqrt(Math.pow(width/2, 2) - Math.pow(height/2, 2))
        const focal1 = new Point(middlePoint.getX() - distanceBetweenFocals, middlePoint.getY())
        const focal2 = new Point(middlePoint.getX() + distanceBetweenFocals, middlePoint.getY())

        const maxDistanceToFocals = width

        let pixelsDrawn = 0
        while(pixelsDrawn < amountOfPixels){
            let randomX = Math.floor(Math.random() * width) - width/2 + middlePoint.getX();
            let randomY = Math.floor(Math.random() * height) - height/2 + middlePoint.getY();
            let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the ellipse, if not new one generated
            while(MathUtils.getDistanceToTwoPoints(randomPoint, focal1, focal2) > maxDistanceToFocals){
                randomX = Math.floor(Math.random() * width) - width/2 + middlePoint.getX();
                randomY = Math.floor(Math.random() * height) - height/2 + middlePoint.getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(this.BLACK, randomPoint)

            pixelsDrawn++;
        }
    }

    drawLeaningEllipse(height, width, middlePoint, angle, fillPercentage) {
        const amountOfPixels = 3.14*(height/2)*(width/2)*fillPercentage/100;

        const radiansAngle = angle*3.14/180;
        
        const distanceBetweenFocals = Math.sqrt(Math.pow(width/2, 2) - Math.pow(height/2, 2))

        const focal1 = new Point(middlePoint.getX() - distanceBetweenFocals*Math.cos(radiansAngle), middlePoint.getY() - distanceBetweenFocals*Math.sin(radiansAngle))
        const focal2 = new Point(middlePoint.getX() + distanceBetweenFocals*Math.cos(radiansAngle), middlePoint.getY() + distanceBetweenFocals*Math.sin(radiansAngle))

        const rectWidth = width*Math.cos(radiansAngle) + height*Math.sin(radiansAngle)
        const rectHeight = width*Math.sin(radiansAngle) + height*Math.cos(radiansAngle)

        const maxDistanceToFocals = width

        let pixelsDrawn = 0
        while(pixelsDrawn < amountOfPixels){
            let randomX = Math.floor(Math.random() * rectWidth) - rectWidth/2+ middlePoint.getX();
            let randomY = Math.floor(Math.random() * rectHeight) - rectHeight/2 + middlePoint.getY();
            let randomPoint = new Point(randomX, randomY)

            //checking if the point is in the ellipse, if not new one generated
            while(MathUtils.getDistanceToTwoPoints(randomPoint, focal1, focal2) > maxDistanceToFocals){
                randomX = Math.floor(Math.random() * rectWidth) - rectWidth/2+ middlePoint.getX();
                randomY = Math.floor(Math.random() * rectHeight) - rectHeight/2 + middlePoint.getY();
                randomPoint = new Point(randomX, randomY)
            }

            this.drawPixel(this.BLACK, randomPoint)

            pixelsDrawn++;
        }
    }

    drawPixel(colour, point) {
        this.getImage().setPixelColor(colour, point.getX(), point.getY());
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

}

export default ChimpanzeeWithBrush