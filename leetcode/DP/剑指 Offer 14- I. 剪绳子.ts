// https://leetcode.cn/problems/jian-sheng-zi-lcof/
// dp记录拆分最大值，进而需要判断不拆的情况来处理
function cuttingRope(n: number): number {
  // dp记录每个数字可拆分的最大值，一直到n
  let dp = Array(n + 1).fill(0); // 多一位，脚标记录自己
  dp[1] = 1, dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    // 因为每个dp保存的都是切开后所有可能的最大值，因此只需判断拆成两份的情况，即可实际上包含拆成若干次的情况
    const m = i >> 1; // 切到中间即可
    let max = -1;
    for (let j = 1; j <= m; j++) {
      // 这里j和i-j不一定拆，因此需要分别对比照出真正的最大值
      const numL = j > dp[j] ? j : dp[j];
      const numR = i - j > dp[i - j] ? i - j : dp[i - j];
      // console.log(j, dp[j], i-j,dp[i-j]);
      const num = numL * numR;
      max = max < num ? num : max;
    }
    dp[i] = max;
    // console.log(dp)
  }
  return dp[n];
};