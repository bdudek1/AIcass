class RandomEffect {

    constructor() {
        
    }

    draw(image) {
        const randomEffectNumber = Math.random()*8;

        switch(true){
            case randomEffectNumber < 1 :
                image.dither565()
                break;
            case randomEffectNumber < 2 :
                const brightness = Math.random()*2 - 1;
                image.brightness(brightness);
                break;
            case randomEffectNumber < 3 :
                const contrast = Math.random()*2 - 1;
                image.contrast(contrast);
                break;
            case randomEffectNumber < 4 :
                image.normalize();
                break;
            case randomEffectNumber < 5 :
                const posterizeFactor = Math.floor(Math.random()*250 + 1)
                image.posterize(posterizeFactor);
                break;
            case randomEffectNumber < 6 :
                const blurFactor = Math.floor(Math.random()*2 + 1)
                image.blur(blurFactor);
                break;
            case randomEffectNumber < 7 :
                const gaussFactor = Math.floor(Math.random()*3 + 1)
                image.gaussian(gaussFactor);
                break;
            case randomEffectNumber < 8 :
                const pixelateFactor = Math.random()*10
                image.pixelate(pixelateFactor);
                break;
        }
        
    }

}

export default RandomEffect;