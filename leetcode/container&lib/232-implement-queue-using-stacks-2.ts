// 直接用ts的特殊数组函数shift实现
class MyQueue {
    private queue_tmp: number[];

    constructor() {
        this.queue_tmp = [];
    }

    push(x: number): void {
        this.queue_tmp.push(x);
    }

    pop(): number {
        // 直接用ts方法弹出第一个值
        // todo: 这里正常应先判断是否为空，空返回-1
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

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */