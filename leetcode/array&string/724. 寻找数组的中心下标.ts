// https://leetcode.cn/problems/find-pivot-index/
// 变相前缀和，前后需要同步处理
function pivotIndex(nums: number[]): number {
  // 先计算总和
  let sum = nums.reduce((f, b) => f + b);
  if (sum - nums[0] == 0) return 0;
  // 将下标从1开始递增，便于处理
  let rSum = 0;
  let lSum = sum - nums[0];
  for (let midI = 1; midI < nums.length; midI++) {
    // 根据midI对应值的内容调整左右
    rSum += nums[midI - 1];
    lSum -= nums[midI];
    // console.log(rSum, nums[midI], lSum);
    if (rSum == lSum) return midI;
  }
  return -1;
};