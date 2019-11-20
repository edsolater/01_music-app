export class BooleanState {
  constructor(public value: boolean, private setStateOfReact: any) {
    //TODO: 这里能更generic一些
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
