import StateBoolean from './StateBoolean'
export default class StateBooleanUI extends StateBoolean {
  private _timeoutID: number
  constructor(public value: boolean, protected setStateOfReact: any) {
    super(value, setStateOfReact)
  }
  get isOn() {
    return this.value
  }
  get isOff() {
    return !this.value
  }
  hide() {
    return super.close()
  }
  show() {
    return super.open()
  }
  deferHide(delay: number = 600) {
    const timeoutID = window.setTimeout(() => {
      this.hide.apply(this)
    }, delay)
    this._timeoutID = timeoutID
  }
  dismissDeferHide() {
    window.clearTimeout(this._timeoutID)
  }
}
