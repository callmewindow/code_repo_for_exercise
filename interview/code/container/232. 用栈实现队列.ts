// https://leetcode.cn/problems/implement-queue-using-stacks/
// 出入栈协同
class MyQueue {
  private inStack: number[];
  private outStack: number[];
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x: number): void {
    // 队列先进先出，所以每次有值加入都先放在入栈
    this.inStack.push(x);
  }

  pop(): number {
    // 从队列头拿值，如果out空，in的第一个是第一个；如果out不空，out的最后一个是第一个
    // 如果out空，需要调整in的内容到out，才能用栈的特性获取到第一个值
    // 请求一定合法
    if(this.outStack.length === 0){
      while(this.inStack.length > 0){
        const inNum = this.inStack.pop();
        this.outStack.push(inNum ? inNum : -1); // 这个类型判断就离谱
      }
    }
    // 此时out一定有值，因此直接pop最后一个便是返回值
    const outNum = this.outStack.pop();
    return outNum ? outNum : -1;
  }

  peek(): number {
    // peek是队列头部，in第一个或out最后一个
    if(this.outStack.length === 0){
      while(this.inStack.length > 0){
        const inNum = this.inStack.pop();
        this.outStack.push(inNum ? inNum : -1);
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty(): boolean {
    // 检测两个是否均空
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/