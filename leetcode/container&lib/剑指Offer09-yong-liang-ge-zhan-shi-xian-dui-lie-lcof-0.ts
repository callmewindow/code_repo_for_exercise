// 优化逻辑，不再多次遍历辅助栈
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
        // // 没值了返回-1，但是应该先判断out，因为如果每次都将out放回in，太花时间
        // if(this._in_stack.length){
        //     return -1;
        // }
        // 因为如果out有值则表示out将pop的值就等于队列的头，因为是in最后pop的
        if(this._out_stack.length){
            return this._out_stack.pop();
        }else{
            // 如果out没值，说明都在in中或者没有值了
            if(this._in_stack.length){
                // 如果in有值，则直接往out中转移，找到头部
                while(this._in_stack.length){
                    // 向out栈中转移不需要pop的值
                    this._out_stack.push(this._in_stack.pop());
                }
                // 同理第一个判断，in没值的时候表示out头部就是队列头
                return this._out_stack.pop()
            } else {
                // 如果都没值，返回-1
                return -1;
            }
        }
    }
}

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */