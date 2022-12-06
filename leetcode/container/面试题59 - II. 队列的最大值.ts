// https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/
// 很离谱，原来均摊O1不用一定O1，优先队列加入新值后处理前面的最大值
class MaxQueue {
  private nums: number[];
  private maxNums: number[];
  constructor() {
    this.nums = [];
    this.maxNums = [];
  }

  max_value(): number {
    if (this.maxNums.length > 0) return this.maxNums[0];
    return -1;
  }

  push_back(value: number): void {
    // 队列和栈不同，弹出时优先离开最前面的，因此在记录最大值时需要记录和头部的关系，才能知道在前面离开后的最大值

    // 思路 而因为先进先出，因此如果用同样的队列保存最大值，如果后面来了一个大值，那么前面的所有最大值判断都要修改，不可行

    // 关键问题就是如何记录，可以确保在头部离开时，准确记录此时的最大值，这个就是最麻烦的地方

    // 草，原来是均摊，那就简单了，直接用原本的思路
    // 从末尾开始处理小于value的值
    const len = this.maxNums.length;
    // 数组的-1脚标不是最后一位
    while (this.maxNums.length > 0 && this.maxNums[this.maxNums.length - 1] < value) this.maxNums.pop();
    while (this.maxNums.length < len) this.maxNums.push(value); // 替换掉前面小于自己的值
    this.maxNums.push(value); // 加上自己的最大值
    this.nums.push(value);
    // 因为是O(1)，所以不能循环替换
  }

  pop_front(): number {
    if (this.nums.length > 0) {
      // 直接shift即可
      this.maxNums.shift();
      return this.nums.shift();
    }
    return -1;
  }
}

// 优化替换方式，直接抛弃没有作用的部分，仅保留当前区域的最大值
class MaxQueue_1 {
  private nums: number[];
  private maxNums: number[];
  constructor() {
    this.nums = [];
    this.maxNums = [];
  }

  max_value(): number {
    if (this.maxNums.length > 0) return this.maxNums[0];
    return -1;
  }

  push_back(value: number): void {
    // 从末尾开始处理小于value的值
    // 数组的-1脚标不是最后一位
    while (this.maxNums.length > 0 && this.maxNums[this.maxNums.length - 1] < value) this.maxNums.pop();
    this.maxNums.push(value); // 将自己作为最大值替换掉前面小于自己的值，只有当自己离开才移除这个value
    this.nums.push(value);
    // 因为是O(1)，所以不能循环替换
  }

  pop_front(): number {
    if (this.nums.length > 0) {
      // 直接shift
      let val = this.nums.shift();
      // 但是因为现在只有一个value，小于的都被剔除了，所以要判断是否剔除max
      if (val == this.maxNums[0]) this.maxNums.shift();
      return val
    }
    return -1;
  }
}