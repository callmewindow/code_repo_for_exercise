// https://leetcode.cn/problems/maximum-subarray/
// 减少数据占用，其实只需要一个贪心即可
function maxSubArray(nums: number[]): number {
  // 连续子数组，最少一个元素，所以默认是元素自己
  // 连续所以不能排序
  // 为了找到最大：从后向前，记录从当前位置开始的最大连续数组和
  // 如何找：在能够抵消向后遍历过程的负数的同时，寻找一个大于0的连续数组情况
  const n = nums.length;
  let max = nums[n - 1]; // 记录临时最大值
  let sum = 0;
  for (let i = n - 1; i >= 0; i--) {
    sum += nums[i];
    // 如果值变大，记录大值，否则从头开始记录
    if (sum > max) max = sum;
    if (sum < 0) sum = 0; // 如果sum小于0，则无论下一个值是什么，都只会更小，所以前往下一个阶段
  }
  return max;
};