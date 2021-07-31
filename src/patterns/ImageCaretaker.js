class ImageCaretaker {
    currentIndex = 0;
    imageMementos = new Array();

    addMemento = (memento) => {
        let isMementoAlreadyAdded = false;

        this.imageMementos.forEach(mem => {
            if((mem.viewPercentage === memento.viewPercentage && !memento.isStep && !mem.isStep) && mem.viewPercentage !== undefined){
                isMementoAlreadyAdded = true;
            }
        })

        if(!isMementoAlreadyAdded && memento){
            this.imageMementos.push(memento)

            this.currentIndex = this.imageMementos.length - 1;
        }
    }

    clearMementos = () => {
        this.imageMementos = new Array();

        this.currentIndex = 0;
    }

    clearFurtherMementos = () => {
        const imagesBuf = new Array();

        for(let i = 0; i <= this.currentIndex; i++){
            imagesBuf.push(this.imageMementos[i])
        }

        this.imageMementos = imagesBuf;

        this.currentIndex = this.imageMementos.length - 1; 
    }

    getCurrentMemento() {
        return this.imageMementos[this.currentIndex];
    }

    setCurrentMementoViewPercentage(viewPercentage){
        this.getCurrentMemento().viewPercentage = viewPercentage
    }

    setCurrentMementoImage(image){
        this.getCurrentMemento().image = image
    }

    getPreviousMemento() {
        if(this.hasPrevious()){
            this.currentIndex = this.currentIndex - 1;
        }

        return this.imageMementos[this.currentIndex];
    }

    getNextMemento() {
        if(this.hasNext()){
            this.currentIndex = this.currentIndex + 1;
        }

        return this.imageMementos[this.currentIndex];
    }

    getPreviousNonStepMemento() {
        while(this.hasPrevious()){
            this.currentIndex = this.currentIndex - 1;

            if(this.getCurrentMemento().isStep === false){
                break;
            }
        }

        return this.imageMementos[this.currentIndex];
    }

    getNextNonStepMemento() {
        while(this.hasNext()){
            this.currentIndex = this.currentIndex + 1;

            if(this.getCurrentMemento().isStep === false){
                break;
            }
        }

        return this.imageMementos[this.currentIndex];
    }

    hasNext() {
        return this.currentIndex < this.imageMementos.length - 1
    }

    hasPrevious() {
        return this.currentIndex > 0 && this.imageMementos[this.currentIndex-1]
    }
}

export default ImageCaretaker