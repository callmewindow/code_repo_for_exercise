// https://leetcode.cn/problems/minimum-operations-to-make-the-array-increasing/
// 不满足时就扩大到满足，保留差值即可
function minOperations(nums: number[]): number {
  // 为了严格递增，即按顺序让i至少大于i-1数值1，直接做差计算
  let res = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) continue;
    res += nums[i - 1] + 1 - nums[i];
    nums[i] = nums[i - 1] + 1;
  }
  return res;
};