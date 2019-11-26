import { constraint } from 'mypack/utils'

export default class StateNumber {
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
  ) {}
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
    this.value = setNumber
    this.setStateOfReact(this.value)
    return this
  }
}
