class Duration {
  constructor(public inputSeconds: number) {}
  format(format = 'MM:ss') {
    if (format === 'MM:ss') {
      const minutes = `${Number.isNaN(this.minutesInClock) ? '--' : this.minutesInClock}`.padStart(
        2,
        '0',
      )
      const seconds = `${Number.isNaN(this.secondsInClock) ? '--' : this.secondsInClock}`.padStart(
        2,
        '0',
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
const duration: UtilFunction = <T extends number>(inputSeconds: T) => new Duration(inputSeconds)
duration.prototype = Duration
export default duration
