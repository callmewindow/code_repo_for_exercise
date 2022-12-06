// https://leetcode.cn/problems/jian-sheng-zi-ii-lcof/
// 用大数勉强实现，运算量较大因此比较耗时
const mod = 1000000007n; // 全部大数处理
function cuttingRope_1(n: number): number {
  // dp记录每个数字可拆分的最大值，一直到n
  let dp = Array(Number(n) + 1).fill(0n); // 多一位，脚标记录自己
  dp[1] = 1n, dp[2] = 1n;
  let nBig = BigInt(n);
  for (let i = 3n; i <= nBig; i++) {
    // 因为每个dp保存的都是切开后所有可能的最大值，因此只需判断拆成两份的情况，即可实际上包含拆成若干次的情况
    const m = i >> 1n; // 切到中间即可
    let max = -1;
    for (let j = 1n; j <= m; j++) {
      // 这里j和i-j不一定拆，因此需要分别对比照出真正的最大值
      const numL = j > dp[Number(j)] ? j : dp[Number(j)];
      const numR = i - j > dp[Number(i - j)] ? i - j : dp[Number(i - j)];
      // console.log(j, dp[j], i-j,dp[i-j]);
      const num = numL * numR;
      max = max < num ? num : max;
    }
    dp[Number(i)] = max;
    // console.log(dp)
  }
  return Number(dp[n] % mod);
};