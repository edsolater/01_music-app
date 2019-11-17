class TimeClass {
  seconds: number
  constructor(inputTime: any) {
    this.seconds = inputTime
  }
  print(config: { format?: 'MM:ss' } = {}) {
    if (config.format === 'MM:ss') {
      return '3:24' //TODO
    }
    return ''
  }
}
const Time = (inputTime)=>new TimeClass(inputTime)
Time.prototype = TimeClass
export default Time