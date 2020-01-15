import { useState } from 'react'

/**
 * 输入初始状态（boolean），返回一个包含布尔值的对象
 */
export default class StateBoolean {
  private _timeoutID: any
  private _callbacks: {
    [updateMethod in keyof StateBoolean]?: ((...anys: any[]) => any)[]
  } = {}
  private _value: boolean
  private _reactSetState: React.Dispatch<React.SetStateAction<boolean>>

  constructor(
    protected config: {
      /**
       * 初始值
       */
      init?: boolean
    },
    state: any,
    setState: any
  ) {
    console.log('StateBoolean 重新初始化')
    this._value = Boolean(state)
    this._reactSetState = setState
  }
  get isOn() {
    return this.getValue()
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
    return this.set(!this.getValue())
  }
  open() {
    return this.set(true)
  }
  close() {
    return this.set(false)
  }
  turnOn() {
    return this.open()
  }
  turnOff() {
    return this.close()
  }
  show() {
    return this.open()
  }
  hide() {
    return this.close()
  }
  // 宿主环境需要有setTimeout的能力
  deferHide(delay: number = 600) {
    const timeoutID = globalThis.setTimeout(() => {
      this.hide.apply(this)
    }, delay)
    this._timeoutID = timeoutID
    return this
  }

  set(newBoolean: boolean) {
    //触发设定值的回调
    this._callbacks.set?.forEach((callback) => callback(newBoolean))
    this._value = newBoolean
    this._reactSetState(newBoolean)
    return this
  }

  getValue() {
    return this._value
  }

  // 额外：宿主环境需要有clearTimeout的能力
  dismissDeferHide() {
    globalThis.clearTimeout(this._timeoutID)
    return this
  }

  // 注册回调
  on(eventName: keyof StateBoolean, fn: (...anys: any[]) => any) {
    this._callbacks[eventName]?.push(fn)
    return this
  }
}
