import { constraint } from 'mypack/utils'

/**
 * 输入初始状态（number），返回一个包含数字的对象
 */
export default class StateNumber {
  private _callbacks: {
    [updateMethod in keyof StateNumber]?: ((...anys: any[]) => any)[]
  } = {}
  _state: number // TODO：要装饰上private
  private _reactSetState: React.Dispatch<React.SetStateAction<number>>

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
    state:any,
    setState:any
  ) {
    this._state = Number(state)
    this._reactSetState = setState
    console.log('33: ', 33) //TOFIX: 竟然会被调用多次，不符合直觉
  }
  add(addNumber: number) {
    return this.set(this._state + addNumber)
  }
  /**
   * @alias
   */
  increase(addNumber: number) {
    return this.add(addNumber)
  }
  plus(addNumber: number) {
    return this.add(addNumber)
  }
  set(setNumber: number) {
    if (this.config?.range) {
      setNumber = constraint(setNumber, { range: this.config.range })
    }
    //触发设定值的回调
    this._callbacks.set?.forEach((callback) => callback(setNumber))
    return this.setState(setNumber)
  }
  getState() {
    this._callbacks.getState?.forEach((callback) => callback())
    return this._state
  }
  setState(newNumber: number) {
    //触发设定值的回调
    this._callbacks.setState?.forEach((callback) => callback(newNumber))
    // 更新JavaScript的对象的值
    this._state = newNumber
    // 通知react以更新UI
    this._reactSetState(this._state)
    // 链式调用
    return this
  }
  // 注册回调
  on(eventName: keyof StateNumber, fn: (...anys: any[]) => any) {
    this._callbacks[eventName]?.push(fn)
    return this
  }
}
