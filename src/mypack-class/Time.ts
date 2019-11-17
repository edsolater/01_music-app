export default class Time {
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
