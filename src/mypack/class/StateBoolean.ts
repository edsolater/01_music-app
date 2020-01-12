export default class StateBoolean {
  private _timeoutID: any
  constructor(public value: boolean, protected setStateOfReact: any) {}
  get isOn() {
    return this.value
  }
  get isOff() {
    return !this.isOn
  }
  get isTrue() {
    return this.isOn
  }
  get isFalse() {
    return this.isOff
  }
  get isOpen() {
    return this.isOn
  }

  toggle() {
    this.value = !this.value
    this.setStateOfReact(this.value)
    return this
  }
  open() {
    this.value = true
    this.setStateOfReact(this.value)
    this.dismissDeferHide()
    return this
  }
  close() {
    this.value = false
    this.setStateOfReact(this.value)
    return this
  }
  turnOn() {
    return this.open()
  }
  turnOff() {
    return this.close()
  }
  show() {
    this.open()
    return this
  }
  hide() {
    this.close()
    return this
  }
  // 宿主环境需要有setTimeout的能力
  deferHide(delay: number = 600) {
    const timeoutID = globalThis.setTimeout(() => {
      this.hide.apply(this)
    }, delay)
    this._timeoutID = timeoutID
    return this
  }
  // 宿主环境需要有clearTimeout的能力
  private dismissDeferHide() {
    globalThis.clearTimeout(this._timeoutID)
    return this
  }
}
