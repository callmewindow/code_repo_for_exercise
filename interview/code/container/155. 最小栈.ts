 // https://leetcode.cn/problems/min-stack/
 // 
 class MinStack {
  private x_stack: number[];
  private min_stack: number[];
  constructor() {
    this.x_stack = [];
    this.min_stack = [Infinity];
  }

  push(val: number): void {
    this.x_stack.push(val);
    // 和当前的最小值比较，看谁小
    // 因为栈先进后出，所以最小值也直接push即可
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], val));

  }

  pop(): void {
    this.x_stack.pop();
    this.min_stack.pop();
  }

  top(): number {
    return this.x_stack[this.x_stack.length - 1];

  }

  getMin(): number {

    return this.min_stack[this.min_stack.length - 1];
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */