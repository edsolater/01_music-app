export default class StateCollectionObject<O> {
  constructor(public value: O, protected setStateOfReact: any, protected config?: {}) {
    //TODO: 这里能更generic一些
  }
  set(propName: string, value: any) {
    this.value[propName] = value
    this.setStateOfReact(this.value)
    return this
  }
}
