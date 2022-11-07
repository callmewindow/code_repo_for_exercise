// 实现O(1)的最小栈
class MinStack {
    private _stack: number[];
    private _minStack: number[];
    constructor() {
        this._stack = [];
        this._minStack = [Number.MAX_SAFE_INTEGER];
    }

    push(x: number): void {
        this._stack.push(x);
        // 记录当前元素入栈后，最小值的变化
        this._minStack.push(Math.min(this._minStack.slice(-1)[0], x));
    }

    pop(): void {
        // 因为栈进入和离开的顺序是一样的，所以如果栈顶最小则表示min顶也是它
        // 直接都pop即可
        this._stack.pop();
        this._minStack.pop();
    }

    top(): number {
        // ts不能-1获取最后一个元素
        // return this._stack[-1];
        // 但是slice可以-1
        return this._stack.slice(-1)[0];
        // 速度和len - 1差不多
        // return this._stack[this._stack.length - 1];
    }

    min(): number {
        // O(1)因此不能循环
        return this._minStack.slice(-1)[0];
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */