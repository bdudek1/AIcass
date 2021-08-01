import DrawableAdapter from "../patterns/DrawableAdapter";

class RandomEffect extends DrawableAdapter{
    
    DITHER_FREQUENCY = parseInt(process.env.REACT_APP_DITHER_FREQUENCY)
    BRIGHTNESS_FREQUENCY = parseInt(process.env.REACT_APP_BRIGHTNESS_FREQUENCY)
    CONTRAST_FREQUENCY = parseInt(process.env.REACT_APP_CONTRAST_FREQUENCY)
    NORMALIZE_FREQUENCY = parseInt(process.env.REACT_APP_NORMALIZE_FREQUENCY)
    POSTERIZE_FREQUENCY = parseInt(process.env.REACT_APP_POSTERIZE_FREQUENCY)
    BLUR_FREQUENCY = parseInt(process.env.REACT_APP_BLUR_FREQUENCY)
    GAUSSIAN_FREQUENCY = parseInt(process.env.REACT_APP_GAUSSIAN_FREQUENCY)
    PIXELATE_FREQUENCY = parseInt(process.env.REACT_APP_PIXELATE_FREQUENCY)

    constructor() {
        super();
    }

    draw(image) {
        const randomEffectNumber = Math.random()*this.PIXELATE_FREQUENCY;

        switch(true){
            case randomEffectNumber < this.DITHER_FREQUENCY :
                image.dither565()
                break;
            case randomEffectNumber < this.BRIGHTNESS_FREQUENCY :
                const brightness = Math.random()*0.4 + 0.2;
                image.brightness(brightness);
                break;
            case randomEffectNumber < this.CONTRAST_FREQUENCY :
                const contrast = Math.random()*0.4 + 0.2;
                image.contrast(contrast);
                break;
            case randomEffectNumber < this.NORMALIZE_FREQUENCY :
                image.normalize();
                break;
            case randomEffectNumber < this.POSTERIZE_FREQUENCY :
                const posterizeFactor = Math.floor(Math.random()*150 + 1)
                image.posterize(posterizeFactor);
                break;
            case randomEffectNumber < this.BLUR_FREQUENCY :
                const blurFactor = Math.floor(Math.random()*2 + 1)
                image.blur(blurFactor);
                break;
            case randomEffectNumber < this.GAUSSIAN_FREQUENCY :
                const gaussFactor = Math.floor(Math.random()*2 + 1)
                image.gaussian(gaussFactor);
                break;
            case randomEffectNumber < this.PIXELATE_FREQUENCY :
                const pixelateFactor = Math.random()*7
                image.pixelate(pixelateFactor);
                break;
        }
        
    }

}

export default RandomEffect;