export default class StateBoolean {
  private _timeoutID: any
  private mutable: boolean
  constructor(public value: boolean, protected setStateOfReact: any) {
    this.mutable = true
  }
  get isOn() {
    return this.value
  }
  get isOpen() {
    return this.value
  }
  get isTrue() {
    return this.value
  }
  get isOff() {
    return !this.isOn
  }

  isImmutable(flag?: boolean) {
    this.mutable = !flag
    return this
  }

  toggle() {
    this.value = !this.value
    this.setStateOfReact(this.value)
    return this
  }
  open() {
    this.value = true
    this.setStateOfReact(this.value)
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
    if (this.mutable) {
      this.open()
    }
    return this
  }
  hide() {
    if (this.mutable) {
      this.close()
    }
    return this
  }
  // 宿主环境需要有setTimeout的能力
  deferHide(delay: number = 600) {
    if (this.mutable) {
      const timeoutID = globalThis.setTimeout(() => {
        this.hide.apply(this)
      }, delay)
      this._timeoutID = timeoutID
    }
    return this
  }
  // 宿主环境需要有clearTimeout的能力
  dismissDeferHide() {
    if (this.mutable) {
      globalThis.clearTimeout(this._timeoutID)
    }
    return this
  }
}
