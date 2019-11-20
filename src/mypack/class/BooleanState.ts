export class BooleanState {
  constructor(public value: boolean, private setStateOfReact: any) {
    //TODO: 这里能更generic一些
  }
  get isOpen() {
    return this.value
  }
  get isOn() {
    return this.value
  }
  get isTrue(){
    return this.value
  }
  toggle() {
    this.value = !this.value
    this.setStateOfReact(this.value)
    return this
  }
  open() {
    this.value = true
    this.setStateOfReact(this.value)
    return this
  }
  close() {
    this.value = false
    this.setStateOfReact(this.value)
    return this
  }
  turnOn() {
    return this.open()
  }
  turnOff() {
    return this.close()
  }
}
