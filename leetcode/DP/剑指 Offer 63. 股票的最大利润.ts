// https://leetcode.cn/problems/gu-piao-de-zui-da-li-run-lcof/
// 贪心实现求解
function maxProfit(prices: number[]): number {
  // 因为只有一次买卖，因此直接获取前面的最小值，然后轮流判断后面的理论即可
  let minP = Number.MAX_SAFE_INTEGER;
  let maxEarn = 0;
  for (let p of prices) {
    if (p > minP) minP = p;
    if (p - minP > maxEarn) maxEarn = p - minP;
  }
  return maxEarn;
};

// 动态规划硬dp，用k次交易的解法解答1次交易！
function maxProfit_1(prices: number[]): number {
  let n = prices.length;
  // 如果天数小于2则不可能完成交易，直接退出
  if (n < 2) return 0;
  // 最大交易次数
  let dealCnt = 1;
  // 这里只有先fill了才能用map替换为其他的，new不是必须的
  // earn记录角标对应的这一天交易若干次时处于三种状态的最大盈利
  // 注意dealcnt要+1，对应0次交易的边界值
  let earn: number[][][] = Array(n).fill(0)
    .map(() => Array(dealCnt + 1).fill(0)
      .map(() => Array(3).fill(0)));
  for (let i = 1; i < n; i++) {
    // 根据交易次数更新盈利
    for (let j = 1; j <= dealCnt; j++) {
      // 本次不交易，就等于前一天三种情况的最大值
      earn[i][j][0] = Math.max(...earn[i - 1][j]);
      // 本次买入，最大值同样等于前一天不交易或卖出的最大值，不能连续买入;
      earn[i][j][1] = Math.max(earn[i - 1][j][0], earn[i - 1][j][2]);
      // 本次卖出，会完成一次交易，最大值等于前面某天时买入时的最大值，加上本次卖出的，两天之间的差值
      let dealEarnMax = 0;
      for (let k = 0; k < i; k++) {
        const tmp = earn[k][j - 1][1] + prices[i] - prices[k];
        if (tmp > dealEarnMax) dealEarnMax = tmp;
      }
      earn[i][j][2] = dealEarnMax;
    }
  }
  // console.log(earn)

  // 超级转化，实现整个矩阵最大值的计算
  let earnMax = Math.max(...earn
    .map((day) => Math.max(...day
      .map((deal) => Math.max(...deal)))));
  // 防止错误情况？先加上
  return earnMax > 0 ? earnMax : 0;
};