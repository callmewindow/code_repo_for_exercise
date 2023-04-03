// https://leetcode.cn/problems/longest-common-subsequence/
// 最长公共子序列问题
function longestCommonSubsequence(text1: string, text2:string) {
  const n1 = text1.length, n2 = text2.length;
  // 为了让字符的定位更清晰这里多处理一位
  const dp = Array(n1 + 1).fill(0).map(() => Array(n2 + 1).fill(0));
  for (let i = 1; i <= n1; i++) {
      const c1 = text1[i - 1];
      // 为了确保每一个遍历，需要双重循环
      for (let j = 1; j <= n2; j++) {
          const c2 = text2[j - 1];
          // 逐步更新ij状态
          if (c1 === c2) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
      }
  }
  return dp[n1][n2];
};