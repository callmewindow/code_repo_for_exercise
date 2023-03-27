// https://leetcode.cn/problems/shuffle-an-array/
// 洗牌算法寻找i脚标之后的随机元素进行交换处理
class Solution {
  private nums: number[];
  private original: number[];
  constructor(nums: number[]) {
    this.nums = nums;
    this.original = this.nums.slice();
  }

  reset(): number[] {
    // 注意深拷贝
    this.nums = this.original.slice();
    return this.nums;
  }

  shuffle(): number[] {
    // Fisher-Yates 洗牌算法
    for (let i = 0; i < this.nums.length; ++i) {
      // 找到i元素之后的随机一个元素的脚标准备交换
      // 类似于随机剔除i到末尾的一个元素，但是这里是随机排序，所以只是找到j
      const j = Math.floor(Math.random() * (this.nums.length - i)) + i;
      // 交换
      [this.nums[i], this.nums[j]] = [this.nums[j], this.nums[i]];
    }
    return this.nums;
  }
}
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */