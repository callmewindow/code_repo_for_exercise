// https://leetcode.cn/problems/coin-change/
// dp按照钱数进行方案的寻找，寻找前一个方案，基于零钱数量进行拆分
function coinChange(coins: number[], amount: number): number {
  // 贪心无法解决，所以需要dp
  // 按照金额进行dp，max表示不可能
  let max = amount + 1;
  const dp: number[] = new Array(max).fill(max);
  // 0不需要提供硬币
  dp[0] = 0;
  // 从1块钱的情况开始寻找最小的能满足的数量
  for (let i = 1; i <= amount; i++) {
    // 需要多少钱就去coins中寻找
    for (let j = 0; j < coins.length; j++) {
      // 只有当能被使用，才进行对比，i就是当前需要寻找的总金额
      if (coins[j] <= i) {
        // 对比是目前方案的硬币少，还是i-coins[j]金额时+1的硬币少
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  // 看是否找到了可行方案，默认max会大于amount
  return dp[amount] > amount ? -1 : dp[amount];
};