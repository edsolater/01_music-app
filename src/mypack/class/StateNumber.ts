import { constraint } from 'mypack/utils'

/**
 * 输入初始状态（number），返回一个包含数字的对象
 */
export default class StateNumber {
  private _callbacks: {
    [updateMethod in keyof StateNumber]?: ((...anys: any[]) => any)[]
  } = {}
  private _value: number
  private _reactSetState: React.Dispatch<React.SetStateAction<number | undefined>>

  constructor(
    protected config: {
      /**
       * 设定限定范围
       */
      range?: [number, number]
      /**
       * 初始值
       */
      init?: number
    },
    state: any,
    setState: any,
  ) {
    this._value = Number(state)
    this._reactSetState = setState
  }
  /**
   * @alias
   */
  add(addNumber: number) {
    this._callbacks.add?.forEach((callback) => callback())
    return this.set(this._value + addNumber)
  }
  /**
   * @alias
   */
  increase(addNumber: number) {
    return this.add(addNumber)
  }
  /**
   * @alias
   */
  plus(addNumber: number) {
    return this.add(addNumber)
  }
  set(setNumber: number) {
    if (this.config?.range) {
      setNumber = constraint(setNumber, { range: this.config.range })
    }
    //触发设定值的回调
    this._callbacks.set?.forEach((callback) => callback(setNumber))
    // 更新JavaScript的对象的值
    this._value = setNumber
    // 通知react以更新UI
    this._reactSetState(this._value)
    // 链式调用
    return this
  }

  getValue() {
    this._callbacks.getValue?.forEach((callback) => callback())
    return this._value
  }

  // 注册回调
  on(eventName: keyof StateNumber, fn: (...anys: any[]) => any) {
    this._callbacks[eventName]?.push(fn)
    return this
  }
}
