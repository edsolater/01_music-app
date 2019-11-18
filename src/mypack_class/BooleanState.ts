export class BooleanState {
  constructor(public state: boolean, private setStateOfReact: any) {
    //TODO: 这里能更generic一些
  }
  toggle() {
    this.state = !this.state
    this.setStateOfReact(this.state)
    return this
  }
  open() {
    this.state = true
    this.setStateOfReact(this.state)
    return this
  }
  close() {
    this.state = false
    this.setStateOfReact(this.state)
    return this
  }
  on() {
    return this.open()
  }
  off() {
    return this.close()
  }
  yes() {
    return this.open()
  }
  no() {
    return this.close()
  }
}
