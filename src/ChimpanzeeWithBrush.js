import Jimp from 'jimp';

class ChimpanzeeWithBrush {
    IMAGE_TENSOR_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_TENSOR_HEIGHT)
    IMAGE_TENSOR_WIDTH = parseInt(process.env.REACT_APP_IMAGE_TENSOR_WIDTH)

    IMAGE_HEIGHT = parseInt(process.env.REACT_APP_IMAGE_HEIGHT)
    IMAGE_WIDTH = parseInt(process.env.REACT_APP_IMAGE_WIDTH)

    image;

    constructor() {

    }

    build(image) {
        return new Promise(resolve => {
            if(image){
                Jimp.read(image).then(jimpImage => {
                    resolve(jimpImage)
                })
            }else{
                new Jimp(this.IMAGE_HEIGHT, this.IMAGE_WIDTH, 'green', (error, jimpImage) => {
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

}

export default ChimpanzeeWithBrush