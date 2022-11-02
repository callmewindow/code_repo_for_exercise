// 优化代码结构，更简洁
class MyQueue {
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

    pop(): number {
        if(this.stack_help.length == 0){
            // help空，表示需要的值在main开头，因此全转移到help
            while(this.stack_main.length != 0){
                this.stack_help.push(this.stack_main.pop());
            }
        }
        // help不空，无论main是否空，队列头都在help尾部，因为是main倒序转移而来的
        return this.stack_help.pop();
    }

    peek(): number {
        // 相比pop，peek只是不需要pop，因此微调即可
        if(this.stack_help.length == 0){
            while(this.stack_main.length != 0){
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

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */