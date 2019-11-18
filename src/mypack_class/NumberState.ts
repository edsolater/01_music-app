export class NumberState extends Number {
  constructor(public state: number, private setStateOfReact: any) {
    super(state);
  }
  add(addNumber: number) {
    this.state = this.state + addNumber;
    this.setStateOfReact(this.state);
    return this;
  }
  increase(addNumber: number) {
    return this.add(addNumber);
  }
  plus(addNumber: number) {
    return this.add(addNumber);
  }
  set(setNumber: number) {
    this.state = setNumber;
    this.setStateOfReact(this.state);
    return this;
  }
}
