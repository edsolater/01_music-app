import { constraint } from 'mypack/utils'

export default class StateNumber {
  callbacks: {
    set: any[]
  }
  constructor(
    /**
     * 吐出数据内容
     */
    public value: number,
    private setStateOfReact: any,
    protected config?: {
      /**
       * 设定限定范围
       */
      range?: [number, number]
    },
  ) {
    this.callbacks = {
      set: [],
    }
  }
  add(addNumber: number) {
    return this.set(this.value + addNumber)
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
    //触发回调
    this.callbacks.set.forEach((callback) => callback(setNumber))
    this.value = setNumber
    this.setStateOfReact(this.value)
    return this
  }
  // 注册回调
  on(eventName: 'set', fn:(...anys:any[])=>any) {
    this.callbacks[eventName].push(fn)
    return this
  }
}
