import StateBoolean from './StateBoolean'
export default class StateBooleanUI extends StateBoolean {
  private _timeoutID: number
  private mutable: boolean
  constructor(public value: boolean, protected setStateOfReact: any) {
    super(value, setStateOfReact)
    this.mutable = true
  }
  get isOn() {
    return this.value
  }
  get isOff() {
    return !this.isOn
  }
  hide() {
    if (this.mutable) {
      super.close()
    }
    return this
  }
  show() {
    if (this.mutable) {
      super.open()
    }
    return this
  }
  isImmutable(flag?: boolean) {
    this.mutable = !flag
    return this
  }
  deferHide(delay: number = 600) {
    if (this.mutable) {
      const timeoutID = window.setTimeout(() => {
        this.hide.apply(this)
      }, delay)
      this._timeoutID = timeoutID
    }
    return this
  }
  dismissDeferHide() {
    if (this.mutable) {
      window.clearTimeout(this._timeoutID)
    }
    return this
  }
}
