import { useState, useDebugValue } from 'react'

export class NumberState {
  constructor(public state: number, private setStateOfReact: any) {
    //TODO: 这里能更generic一些
  }
  add(addNumber:number){
    this.state = this.state + addNumber
    this.setStateOfReact(this.state)
  }
  addOne() {
    this.state = this.state + 1
    this.setStateOfReact(this.state)
  }
  addTwo() {
    this.state = this.state + 2
    this.setStateOfReact(this.state)
  }
  addThree() {
    this.state = this.state + 3
    this.setStateOfReact(this.state)
  }
  set(setNumber:number){
    this.state = setNumber
    this.setStateOfReact(this.state)
  }
  [Symbol.toPrimitive](){
    return this.state
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
