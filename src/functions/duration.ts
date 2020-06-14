import { isNunNullable } from './judger'
const availableUnits = [
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'millisecond',
  'second',
  'minute',
  'hour',
  'day',
  'ms',
  's',
  'm',
  'h',
  'd'
] as const
type Unit = typeof availableUnits[number]
const availableModes = ['set', 'add', 'substract'] as const
type Mode = typeof availableModes[number]

const getTargetUnit = (unit: Unit) => {
  unit = unit.toLowerCase() as Unit
  if (['milliseconds', 'millisecond', 'ms'].includes(unit)) return 'millisecond'
  else if (['seconds', 'second', 's'].includes(unit)) return 'second'
  else if (['minutes', 'minute', 'm'].includes(unit)) return 'minute'
  else if (['hours', 'hour', 'h'].includes(unit)) return 'hour'
  else if (['days', 'day', 'd'].includes(unit)) return 'day'
  else throw new Error(`unknow util: ${unit}`)
}

type DurationDescription = {
  day?: number
  hour?: number
  minute?: number
  second?: number
  millisecond?: number
  total?: number
}
class Duration {
  private _day = 0
  private _hour = 0
  private _minute = 0
  private _second = 0
  private _millisecond = 0
  private _total = 0

  constructor(total?: number)
  constructor(desciptionObj: DurationDescription)
  constructor(paramOne: number | DurationDescription = 0) {
    switch (typeof paramOne) {
      case 'number':
        this._total = paramOne
        this.calculateFromTotal()
        break
      case 'object':
        const durationDescription = paramOne
        if (isNunNullable(durationDescription.total)) {
          this._total = durationDescription.total
          this.calculateFromTotal()
        } else {
          this._day = durationDescription.day ?? 0
          this._hour = durationDescription.hour ?? 0
          this._minute = durationDescription.minute ?? 0
          this._second = durationDescription.second ?? 0
          this._millisecond = durationDescription.millisecond ?? 0
          this.calculateToTotal()
        }
    }
  }
  private calculateFromTotal() {
    let rest = this._total
    this._millisecond = rest % 1000
    rest = Math.trunc(rest / 1000)
    if (rest <= 0) return
    this._second = rest % 60
    rest = Math.trunc(rest / 60)
    if (rest <= 0) return
    this._minute = rest % 60
    rest = Math.trunc(rest / 60)
    if (rest <= 0) return
    this._hour = rest % 24
    rest = Math.trunc(rest / 24)
    if (rest <= 0) return
    this._day = rest
  }
  private calculateToTotal() {
    this._total =
      (((this._day * 24 + this._hour) * 60 + this._minute) * 60 + this._second) * 1000 +
      this._millisecond
  }
  clone() {
    return new Duration(this._total)
  }
  format(format = 'mm:ss') {
    format = format.toLowerCase()
    const dayPlaceholder = format.match(/d+/g)
    if (dayPlaceholder) {
      for (const matchedString of dayPlaceholder) {
        format = format.replace(
          matchedString,
          String(this._day).padStart(matchedString.length, '0')
        )
      }
    }
    const hourPlaceholder = format.match(/h+/g)
    if (hourPlaceholder) {
      for (const matchedString of hourPlaceholder) {
        format = format.replace(
          matchedString,
          String(this._hour).padStart(matchedString.length, '0')
        )
      }
    }
    const minutePlaceholder = format.match(/m+/g)
    if (minutePlaceholder) {
      for (const matchedString of minutePlaceholder) {
        format = format.replace(
          matchedString,
          String(this._minute).padStart(matchedString.length, '0')
        )
      }
    }
    const secondPlaceholder = format.match(/s+/g)
    if (secondPlaceholder) {
      for (const matchedString of secondPlaceholder) {
        if (matchedString.length === 3) {
          format = format.replace(
            matchedString,
            String(this._millisecond).padStart(matchedString.length, '0')
          )
        } else {
          format = format.replace(
            matchedString,
            String(this._second).padStart(matchedString.length, '0')
          )
        }
      }
    }
    return format
  }
  millisecond(): number
  millisecond(v: number, mode?: Mode): Duration
  millisecond(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this._total - this._millisecond + v)
      if (mode === 'add') return new Duration(this._total + v)
      else return new Duration(this._total - this._millisecond - v)
    } else {
      return this._millisecond
    }
  }
  second(): number
  second(v: number, mode?: Mode): Duration
  second(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this._total - (this._second + v) * 1000)
      if (mode === 'add') return new Duration(this._total + v * 1000)
      else return new Duration(this._total - (this._second - v) * 1000)
    } else {
      return this._second
    }
  }
  minute(): number
  minute(v: number, mode?: Mode): Duration
  minute(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this._total - (this._minute + v) * 1000 * 60)
      if (mode === 'add') return new Duration(this._total + v * 1000 * 60)
      else return new Duration(this._total - (this._minute - v) * 1000 * 60)
    } else {
      return this._minute
    }
  }
  hour(): number
  hour(v: number, mode?: Mode): Duration
  hour(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this._total - (this._hour + v) * 1000 * 60 * 60)
      if (mode === 'add') return new Duration(this._total + v * 1000 * 60 * 60)
      else return new Duration(this._total - (this._hour - v) * 1000 * 60 * 60)
    } else {
      return this._hour
    }
  }
  day(): number
  day(v: number, mode?: Mode): Duration
  day(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(this._total - (this._day + v) * 1000 * 60 * 60 * 24)
      if (mode === 'add') return new Duration(this._total + v * 1000 * 60 * 60 * 24)
      else return new Duration(this._total - (this._day - v) * 1000 * 60 * 60 * 24)
    } else {
      return this._day
    }
  }
  total(): number
  total(v: number, mode?: Mode): Duration
  total(v?: number, mode: Mode = 'set') {
    if (isNunNullable(v)) {
      if (mode === 'set') return new Duration(v)
      if (mode === 'add') return new Duration(this._total + v)
      else return new Duration(this._total - v)
    } else {
      return this._total
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
