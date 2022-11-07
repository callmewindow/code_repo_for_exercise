// 很慢但是很短的方法，利用函数处理
class NumArray {
    private num_array: number[];
    constructor(nums: number[]) {
        this.num_array = nums;
    }

    sumRange(left: number, right: number): number {
        // 先生成新数组然后计算和
        return this.num_array.slice(left, right + 1).reduce((f,b)=>f+b);
        // 直接计算和
        let sum: number = 0;
        for(let i = left;i <= right;i++){
            sum += this.num_array[i];
        }
        return sum;
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */