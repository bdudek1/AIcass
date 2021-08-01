class ImageCaretaker {
    maxMementosNumber = 100;
    currentIndex = 0;
    imageMementos = new Array();

    addMemento = (memento) => {

        if(!this.isMementoDuplicated(memento)){
            this.imageMementos.push(memento)

            if(this.imageMementos.length > this.maxMementosNumber){
                this.imageMementos.shift();
            }

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

    isMementoDuplicated(memento){
        let isMementoDuplicated = false;

        this.imageMementos.forEach(mem => {
            if(mem.viewPercentage === memento.viewPercentage){
                isMementoDuplicated = true;
            }
        })

        return isMementoDuplicated;
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

    hasNext() {
        return this.currentIndex < this.imageMementos.length - 1
    }

    hasPrevious() {
        return this.currentIndex > 0 && this.imageMementos[this.currentIndex-1]
    }
}

export default ImageCaretaker