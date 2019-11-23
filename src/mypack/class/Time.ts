//作为一种数据的集合，这个也要测试
//！！！！欠测试！！！！
class _Time {
  constructor(public inputSeconds: number) {}
  print(config: { format?: 'MM:ss' } = {}) {
    if (config.format === 'MM:ss') {
      const minutes = `${Number.isNaN(this.minutesInClock) ? '--' : this.minutesInClock}`.padStart(
        2,
        '0'
      )
      const seconds = `${Number.isNaN(this.secondsInClock) ? '--' : this.secondsInClock}`.padStart(
        2,
        '0'
      )
      return `${minutes}:${seconds}`
    }
    return '--:--'
  }
  get totalDays() {
    return this.inputSeconds / (60 * 60 * 24)
  }
  get totalHours() {
    return this.inputSeconds / (60 * 60)
  }
  get totalMinutes() {
    return this.inputSeconds / 60
  }
  get totalSeconds() {
    return this.inputSeconds
  }
  get secondsInClock() {
    return Math.trunc(this.totalSeconds % 60)
  }
  get minutesInClock() {
    return Math.trunc(this.totalMinutes % 60)
  }
  get hoursInClock() {
    return Math.trunc(this.totalHours % 24)
  }
  get daysInClock() {
    return Math.trunc(this.totalDays)
  }
}
const Time = <T extends number>(inputSeconds: T) => new _Time(inputSeconds)
Time.prototype = _Time
export default Time
