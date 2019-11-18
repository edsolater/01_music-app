import { useState, useDebugValue } from 'react'

export class BooleanState {
  constructor(public state: boolean, private setStateOfReact: any) {
    //TODO: 这里能更generic一些
  }
  toggle() {
    this.state = !this.state
    this.setStateOfReact(this.state)
  }
  open() {
    this.state = true
    this.setStateOfReact(this.state)
  }
  close() {
    this.state = false
    this.setStateOfReact(this.state)
  }
  turnOn(){
    this.open()
  }
  turnOff(){
    this.close()
  }
}

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useBooleanState = (init: boolean) => {
  const [state, setState] = useState(init)
  useDebugValue(state ? 'on' : 'off')
  return new BooleanState(state, setState)
}
