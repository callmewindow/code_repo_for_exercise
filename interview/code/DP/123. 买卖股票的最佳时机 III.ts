// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/
// 两次交易分别dp进行处理
function maxProfit(prices: number[]): number {
  const n = prices.length;
  // 默认当作已经买了第一天的，便于处理
  let buy1 = -prices[0], buy2 = -prices[0];
  let sell1 = 0, sell2 = 0;
  for (let i = 1; i < n; i++) {
    // 购买时尽量选择少的，使用负数便于计算
    buy1 = Math.max(buy1, -prices[i]);
    // 卖出时看是之前sell的多，还是目前卖出赚的多
    sell1 = Math.max(sell1, buy1 + prices[i]);
    // 如果目前要买第二次了，则需要对已经卖过一次的最大值进行处理，即在基础上尝试购买
    buy2 = Math.max(buy2, sell1 - prices[i]);
    // 同理找最大
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }
  // 看过程中哪一天sell2两次之后会最贵
  return sell2;
};