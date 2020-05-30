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
