// https://leetcode.cn/problems/longest-increasing-subsequence/
// dp寻找能找到的最长子序列即可
function lengthOfLIS(nums: number[]): number {
  // 最长递增直接dp
  const n = nums.length;
  const dp = new Array(n);
  dp[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    // 因为不需要连续，所以寻找后续能连上的最长的进行拼接
    let maxLen = 0;
    for (let j = i + 1; j < n; j++) {
      // 只有严格递增才能连
      if (nums[j] > nums[i]) maxLen = Math.max(maxLen, dp[j]);
    }
    dp[i] = 1 + maxLen;
  }
  return Math.max(...dp);
};