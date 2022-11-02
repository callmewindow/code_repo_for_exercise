// 优化pop的逻辑
class CQueue {
    _in_stack: number[]
    _out_stack: number[]
    constructor() {
        this._in_stack = [];
        this._out_stack = [];
    }

    appendTail(value: number): void {
        this._in_stack.push(value);
    }

    deleteHead(): number {
        // 如果out无值则说明头在in，否则在out头
        if(this._out_stack.length == 0){
            while(this._in_stack.length){
                this._out_stack.push(this._in_stack.pop());
            }
        }
        // 判断out最终有无值，没有-1，有则pop
        if(this._out_stack.length == 0) return -1;
        return this._out_stack.pop();
    }
}

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */