import { constraint } from 'mypack/utils'
import { useState } from 'react'

type AvaliableMethods = 'set'

/**
 * 输入初始状态（number），返回一个包含数字的对象
 */
export default class StateNumber {
  private _callbacks: {
    [updateMethod in AvaliableMethods]: ((...anys: any[]) => any)[]
  }
  value: number
  private _reactSetState: React.Dispatch<React.SetStateAction<number>>
  constructor(
    initNumber: number,
    protected config?: {
      /**
       * 设定限定范围
       */
      range?: [number, number]
    },
  ) {
    this._callbacks = {
      set: [],
    } //TEMP

    const [state, setState] = useState(initNumber)
    this.value = state
    this._reactSetState = setState
  }
  add(addNumber: number) {
    return this.set(this.value + addNumber, false)
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

  set(setNumber: number, hasCallback: boolean = true) {
    if (this.config?.range) {
      setNumber = constraint(setNumber, { range: this.config.range })
    }

    //触发设定值的回调
    if (hasCallback) this._callbacks?.set.forEach((callback) => callback(setNumber))
    // 更新JavaScript的对象的值
    this.value = setNumber
    // 通知react以更新UI
    this._reactSetState(this.value)
    // 链式调用
    return this
  }
  // 注册回调
  on(eventName: AvaliableMethods, fn: (...anys: any[]) => any) {
    this._callbacks[eventName].push(fn)
    return this
  }
}
