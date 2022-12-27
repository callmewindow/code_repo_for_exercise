// https://leetcode.cn/problems/minimum-limit-of-balls-in-a-bag/
// 二分直接查找可能的结果，这种最值的基本都是二分
function minimumSize(nums: number[], maxOperations: number): number {
  let left = 1, right = Math.max(...nums);
  let ans = 0;
  while (left <= right) {
    const y = (left + right) >> 1; // 取中点值
    let ops = 0; // 要都不超过y需要的拆分次数
    for (const x of nums) {
      ops += Math.floor((x - 1) / y); // 看如果要将所有x拆分为小于等于y的情况需要多少次操作
      // 计算当前num是否需要拆分，-1是为了确保恰好为倍数时得到正确的拆分次数
    }
    // 符合条件则继续找更小的y
    if (ops <= maxOperations) {
      // 等于操作次数时不一定是最小的，所以一直找
      ans = y;
      right = y - 1;
    } else {
      // 不符合则找更大的y
      left = y + 1;
    }
  }
  return ans;
};