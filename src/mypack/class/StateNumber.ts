export default class StateNumber {
  constructor(public value: number, private setStateOfReact: any) {}
  add(addNumber: number) {
    this.value = this.value + addNumber
    this.setStateOfReact(this.value)
    return this
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
    this.value = setNumber
    this.setStateOfReact(this.value)
    return this
  }
}
