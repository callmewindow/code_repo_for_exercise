// https://leetcode.cn/problems/running-sum-of-1d-array/
// 最朴素的前缀和
function runningSum(nums: number[]): number[] {
  // 最朴素的前缀和
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }
  return nums;
};