// https://leetcode.cn/problems/ZVAVXX/
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // 因为是连续子数组，所以参考连续子数组和的，需要从1开始，分别记录1，2，3的情况，然后进行加和

  // 如果上一个情况已经大于，则跳过，如果没有大于，则乘上当前值再跳过
  
};