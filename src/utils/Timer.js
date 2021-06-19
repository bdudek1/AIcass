import Observator from '../patterns/Observator';

class Timer extends Observator {
    timeElapsed;

    constructor() {
        super();
        this.timeElapsed = 0;
    }

    setTimeElapsed(timeElapsed) {
        this.timeElapsed = timeElapsed;
    }

    getTimeElapsed() {
        return this.timeElapsed;
    }

    addTime(time){
        this.setTimeElapsed(this.getTimeElapsed() + time);
    }

    update(time){
        this.addTime(time);
        console.log(time)
    }
}

const timerInstance = new Timer();
Object.seal(timerInstance);

export default timerInstance;
