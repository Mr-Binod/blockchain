
// class Sw {
//     constructor () {
//         this.starttime = null;
//         this.endtime = null;
//     }
//     start () {
//         this.starttime = new Date
//         console.log( 'starttime', this.starttime)
//     }
//     stop () {
//         this.endtime = new Date
//         console.log( 'stoptime', this.endtime )
//     }
//     duration () {
//         const duration = Math.floor((this.endtime - this.starttime) / 1000)
//         console.log(duration, 'duration')
//     }
// }

// const sw = new Sw;

// // sw.start()
// // sw.stop()
// sw.duration()


const map = (list, d,  fn) => {
    const newList = []
    for (const item of list){
        console.log(item, d)
        newList.push(fn(item, d))
    } 
    return newList
}

const prices = [100, 200, 300, 400]
const d = 25
const round2 = (n, d) => ("$ " + (Math.floor(n - (n * (d/100)))))
const format = (n, d) => `$ ${round2(n, d)}`

const formattedPrices = map(prices, d, round2)
console.log(formattedPrices)
// console.log(round2)
// console.log(format)