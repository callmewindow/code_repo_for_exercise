// https://leetcode.cn/problems/unique-paths/
// dfs简单题
function uniquePaths(m: number, n: number): number {
  // 声明dp情况，其实只有一行也可以实现
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  // 首行首列一定只有1条
  dp[0] = new Array(n).fill(1);
  for (let x = 1; x < m; x++) dp[x][0] = 1;
  for (let x = 1; x < m; x++) {
    for (let y = 1; y < n; y++) {
      // 合并情况
      dp[x][y] = dp[x - 1][y] + dp[x][y - 1];
    }
  }
  return dp[m - 1][n - 1];
};