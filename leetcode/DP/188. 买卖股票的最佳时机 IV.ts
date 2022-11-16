// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv
// 自实现，记录每天交易若干次时处于不同情况的最大利润，然后遍历
function maxProfit_0(k: number, prices: number[]): number {
  let n = prices.length;
  let dealCnt = k;
  // 如果天数小于2或交易次数为0则不可能完成交易，直接退出
  if (n < 2 || dealCnt == 0) return 0;

  // 注意dealcnt要+1，对应0次交易的边界值
  let earn: number[][][] = Array(n).fill(0)
    .map(() => Array(dealCnt + 1).fill(0)
      .map(() => Array(3).fill(0)));

  // 根据交易次数更新盈利
  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= dealCnt; j++) {
      // 本次不交易，最大值等于前一天三种情况的最大值
      earn[i][j][0] = Math.max(...earn[i - 1][j]);
      // 本次买入，最大值等于前一天不交易或卖出的最大值，不能连续买入
      earn[i][j][1] = Math.max(earn[i - 1][j][0], earn[i - 1][j][2]);
      // 本次卖出，完成一次交易，最大值等于前面某天 j-1次交易 且 自身处于买入状态 时的盈利加上 两天之间的差值 的最大值
      let dealEarnMax = 0;
      for (let k = 0; k < i; k++) {
        const tmp = earn[k][j - 1][1] + prices[i] - prices[k];
        if (tmp > dealEarnMax) dealEarnMax = tmp;
      }
      earn[i][j][2] = dealEarnMax;
    }
  }
  // console.log(earn)

  let earnMax = Math.max(...earn
    .map((day) => Math.max(...day
      .map((deal) => Math.max(...deal)))));
  return earnMax > 0 ? earnMax : 0;
};