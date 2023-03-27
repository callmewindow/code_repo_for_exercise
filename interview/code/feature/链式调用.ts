class calculator {
  private result: number;
  constructor(num: number) {
    this.result = num;
  }
  add(num: number): calculator {
    this.result += num;
    return this;
  }
  minus(num: number): calculator {
    this.result -= num;
    return this;
  }
  multi(num: number): calculator {
    this.result *= num;
    return this;
  }
  div(num: number): calculator {
    this.result /= num;
    return this;
  }
  getVal(): number {
    return this.result
  }
}

const test = new calculator(4);
console.log(test.add(1).minus(2).getVal())