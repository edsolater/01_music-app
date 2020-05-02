import { isNunNullable } from './judger'
import dayjs from 'dayjs'
type Unit =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'ms'
  | 's'
  | 'm'
  | 'h'
  | 'd'
type Mode = 'set' | 'add' | 'substract'

const getTargetUnit = (unit: Unit) => {
  if (['milliseconds', 'millisecond', 'ms'].includes(unit)) return 'millisecond'
  else if (['seconds', 'second', 's'].includes(unit)) return 'second'
  else if (['minutes', 'minute', 'm'].includes(unit)) return 'minute'
  else if (['hours', 'hour', 'h'].includes(unit)) return 'hour'
  else if (['days', 'day', 'd'].includes(unit)) return 'day'
  else throw new Error(`unknow util: ${unit}`)
}

class Duration {
  #day = 0
  #hour = 0
  #minute = 0
  #second = 0
  #millisecond = 0
  #total = 0

  constructor(millisecond = 0) {
    this.#total = millisecond
    this.#calculateFromTotal()
  }
  #calculateFromTotal = () => {
    let rest = this.#total
    this.#millisecond = rest % 1000
    rest = Math.trunc(rest / 1000)
    if (rest <= 0) return
    this.#second = rest % 60
    rest = Math.trunc(rest / 60)
    if (rest <= 0) return
    this.#minute = rest % 60
    rest = Math.trunc(rest / 60)
    if (rest <= 0) return
    this.#hour = rest % 24
    rest = Math.trunc(rest / 24)
    if (rest <= 0) return
    this.#day = rest
  }
  clone() {
    return new Duration(this.#total)
  }
  format(format = 'MM:ss') {
    // TODO 要设计format的机制
    if (format === 'MM:ss') {
      return `${this.#minute.toString().padStart(2, '0')}:${this.#second
        .toString()
        .padStart(2, '0')}`
    }
    return '--:--'
  }
  millisecond(): number
  millisecond(v: number, mode?: Mode): Duration
  millisecond(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this.#total - this.#millisecond + v)
      if (mode === 'add') return new Duration(this.#total + v)
      else return new Duration(this.#total - this.#millisecond - v)
    } else {
      return this.#millisecond
    }
  }
  second(): number
  second(v: number, mode?: Mode): Duration
  second(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this.#total - (this.#second + v) * 1000)
      if (mode === 'add') return new Duration(this.#total + v * 1000)
      else return new Duration(this.#total - (this.#second - v) * 1000)
    } else {
      return this.#second
    }
  }
  minute(): number
  minute(v: number, mode?: Mode): Duration
  minute(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this.#total - (this.#minute + v) * 1000 * 60)
      if (mode === 'add') return new Duration(this.#total + v * 1000 * 60)
      else return new Duration(this.#total - (this.#minute - v) * 1000 * 60)
    } else {
      return this.#minute
    }
  }
  hour(): number
  hour(v: number, mode?: Mode): Duration
  hour(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this.#total - (this.#hour + v) * 1000 * 60 * 60)
      if (mode === 'add') return new Duration(this.#total + v * 1000 * 60 * 60)
      else return new Duration(this.#total - (this.#hour - v) * 1000 * 60 * 60)
    } else {
      return this.#hour
    }
  }
  day(): number
  day(v: number, mode?: Mode): Duration
  day(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this.#total - (this.#day + v) * 1000 * 60 * 60 * 24)
      if (mode === 'add') return new Duration(this.#total + v * 1000 * 60 * 60 * 24)
      else return new Duration(this.#total - (this.#day - v) * 1000 * 60 * 60 * 24)
    } else {
      return this.#day
    }
  }
  total(): number
  total(v: number, mode?: Mode): Duration
  total(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(v)
      if (mode === 'add') return new Duration(this.#total + v)
      else return new Duration(this.#total - v)
    } else {
      return this.#total
    }
  }
  get(unit: Unit) {
    const parsedUnit = getTargetUnit(unit)
    if (parsedUnit === 'day') return this.day()
    if (parsedUnit === 'hour') return this.hour()
    if (parsedUnit === 'minute') return this.minute()
    if (parsedUnit === 'second') return this.second()
    else return this.millisecond()
  }
  set(unit: Unit, value: number) {
    const parsedUnit = getTargetUnit(unit)
    if (parsedUnit === 'day') return this.total(value * 1000 * 60 * 60 * 24, 'set')
    if (parsedUnit === 'hour') return this.total(value * 1000 * 60 * 60 * 24, 'set')
    if (parsedUnit === 'minute') return this.total(value * 1000 * 60, 'set')
    if (parsedUnit === 'second') return this.total(value * 1000, 'set')
    else return this.total(value, 'set')
  }
  add(value: number, unit: Unit = 'millisecond') {
    const parsedUnit = getTargetUnit(unit)
    if (parsedUnit === 'day') return this.total(value * 1000 * 60 * 60 * 24, 'add')
    if (parsedUnit === 'hour') return this.total(value * 1000 * 60 * 60 * 24, 'add')
    if (parsedUnit === 'minute') return this.total(value * 1000 * 60, 'add')
    if (parsedUnit === 'second') return this.total(value * 1000, 'add')
    else return this.total(value, 'add')
  }
  subStract(value: number, unit: Unit = 'millisecond') {
    const parsedUnit = getTargetUnit(unit)
    if (parsedUnit === 'day') return this.total(value * 1000 * 60 * 60 * 24, 'substract')
    if (parsedUnit === 'hour') return this.total(value * 1000 * 60 * 60 * 24, 'substract')
    if (parsedUnit === 'minute') return this.total(value * 1000 * 60, 'substract')
    if (parsedUnit === 'second') return this.total(value * 1000, 'substract')
    else return this.total(value, 'substract')
  }
}

const duration = (value = 0, unit: Unit = 'milliseconds') => {
  const parsedUnit = getTargetUnit(unit)
  if (parsedUnit === 'day') return new Duration(1000 * 60 * 60 * 24 * value)
  if (parsedUnit === 'hour') return new Duration(1000 * 60 * 60 * value)
  if (parsedUnit === 'minute') return new Duration(1000 * 60 * value)
  if (parsedUnit === 'second') return new Duration(1000 * value)
  else return new Duration(value)
}

export default duration

const foo = new Duration().second()
const hello = dayjs().hour()
