
class Sw {
    constructor () {
        this.starttime = null;
        this.endtime = null;
    }
    start () {
        this.starttime = new Date
        console.log( 'starttime', this.starttime)
    }
    stop () {
        this.endtime = new Date
        console.log( 'stoptime', this.endtime )
    }
    duration () {
        const duration = Math.floor((this.endtime - this.starttime) / 1000)
        console.log(duration, 'duration')
    }
}

const sw = new Sw;

// sw.start()
// sw.stop()
sw.duration()