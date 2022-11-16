// https://leetcode.cn/problems/implement-queue-using-stacks/
// 双栈实现队列的基本操作，按部就班实现版
class MyQueue {
  private stack_main: number[];
  private stack_help: number[];

  constructor() {
    this.stack_main = [];
    this.stack_help = [];
  }

  push(x: number): void {
    this.stack_main.push(x);
  }

  pop(): number | undefined {
    if (this.stack_help.length == 0) {
      // 当help为空，表示需要的值在main开头
      while (this.stack_main.length != 0) {
        // 榨干main
        this.stack_help.push(this.stack_main.pop());
      }
      // 此时main底部的值在help结尾
      return this.stack_help.pop();
    } else {
      // 当help不为空，需要判断main是否有值
      // 有值则表示需要的值在help底部（所有值都在help）
      // 无值同理，也在help底部
      // 因此直接返回
      return this.stack_help.pop();
    }
  }

  peek(): number {
    // 相比pop，peek只是不需要pop，因此微调即可
    if (this.stack_help.length == 0) {
      while (this.stack_main.length != 0) {
        this.stack_help.push(this.stack_main.pop());
      }
      // 直接返回最后一个值
      return this.stack_help.slice(-1)[0];
    } else {
      return this.stack_help.slice(-1)[0];
    }
  }

  empty(): boolean {
    // 都为0才是空
    if (this.stack_main.length == 0 && this.stack_help.length == 0) {
      return true;
    }
    return false;
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

// 优化代码结构，更简洁
class MyQueue_1 {
  private stack_main: number[];
  private stack_help: number[];

  constructor() {
    this.stack_main = [];
    this.stack_help = [];
  }

  push(x: number): void {
    // 默认都放main，便于处理
    this.stack_main.push(x);
  }

  pop(): number | undefined {
    if (this.stack_help.length == 0) {
      // help空，表示需要的值在main开头，因此全转移到help
      while (this.stack_main.length != 0) {
        this.stack_help.push(this.stack_main.pop());
      }
    }
    // help不空，无论main是否空，队列头都在help尾部，因为是main倒序转移而来的
    return this.stack_help.pop();
  }

  peek(): number {
    // 相比pop，peek只是不需要pop，因此微调即可
    if (this.stack_help.length == 0) {
      while (this.stack_main.length != 0) {
        this.stack_help.push(this.stack_main.pop());
      }
    }
    // 直接返回值
    return this.stack_help.slice(-1)[0];
  }

  empty(): boolean {
    // 都为0才是空
    return this.stack_main.length == 0 && this.stack_help.length == 0;
  }
}

// 直接用ts的特殊数组函数shift实现
class MyQueue_2 {
  private queue_tmp: number[];

  constructor() {
    this.queue_tmp = [];
  }

  push(x: number): void {
    this.queue_tmp.push(x);
  }

  pop(): number | undefined {
    // 直接用ts方法弹出第一个值
    return this.queue_tmp.shift();
  }

  peek(): number {
    // 只有一个数组因此直接返回
    return this.queue_tmp[0];
  }

  empty(): boolean {
    // 直接判断是否空
    return this.queue_tmp.length == 0;
  }
}