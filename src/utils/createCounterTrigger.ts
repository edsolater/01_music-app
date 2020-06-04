/**
 * 尽量不要使用，只是一种设计理念，当仔细想来没必要封装
 */

export class CounterTrigger {
  time: number = 0
  trigger() {
    const newCounterTrigger = new CounterTrigger()
    newCounterTrigger.time = this.time + 1
    return newCounterTrigger
  }
}

export default function createCounterTrigger() {
  return new CounterTrigger()
}
