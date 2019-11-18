import { useState, useDebugValue } from 'react'

export class NumberState extends Number {
  constructor(public state: number, private setStateOfReact: any) {
    super(state)
  }
  add(addNumber: number) {
    this.state = this.state + addNumber
    this.setStateOfReact(this.state)
    return this
  }
  addOne() {
    this.state = this.state + 1
    this.setStateOfReact(this.state)
    return this
  }
  addTwo() {
    this.state = this.state + 2
    this.setStateOfReact(this.state)
    return this
  }
  addThree() {
    this.state = this.state + 3
    this.setStateOfReact(this.state)
    return this
  }
  set(setNumber: number) {
    this.state = setNumber
    this.setStateOfReact(this.state)
    return this
  }
}

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useNumberState = (init: number) => {
  const [state, setState] = useState(init)
  useDebugValue(`number: ${state}`)
  return new NumberState(state, setState)
}
