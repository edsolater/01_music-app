export class NumberState extends Number {
  constructor(public value: number, private setStateOfReact: any) {
    super(value);
  }
  add(addNumber: number) {
    this.value = this.value + addNumber;
    this.setStateOfReact(this.value);
    return this;
  }
  increase(addNumber: number) {
    return this.add(addNumber);
  }
  plus(addNumber: number) {
    return this.add(addNumber);
  }
  set(setNumber: number) {
    this.value = setNumber;
    this.setStateOfReact(this.value);
    return this;
  }
}
