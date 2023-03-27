// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
// 朴素dp，记录此前最小值来处理
function maxProfit(prices: number[]): number {
  // 一次交易，相当于寻找最大差值
  const n = prices.length;
  // 每天有两种情况，卖或者不买
  //dp[i]表示截止到i，价格的最低点是多少   dp[i]=min(dp[i-1],nums[i])
  let max = 0;
  let dp = new Array(n);
  dp[0] = prices[0];
  for (let i = 1; i < n; i++) {
    // i天最小值就看当前价值和此前比较
    dp[i] = (dp[i - 1] < prices[i]) ? dp[i - 1] : prices[i];
    // 更新之前最小值购入，当天出售的最大情况
    max = (prices[i] - dp[i]) > max ? prices[i] - dp[i] : max;
  }
  return max;
};