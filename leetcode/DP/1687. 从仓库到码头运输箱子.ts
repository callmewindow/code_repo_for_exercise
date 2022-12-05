// https://leetcode.cn/problems/delivering-boxes-from-storage-to-ports/
// 动态规划+滑动窗口，神奇的思路
// 变量按行拆分比较适合补充说明含义
function boxDelivering(
  boxes: number[][],
  portsCount: number,
  maxBoxes: number,
  maxWeight: number
): number {
  const { min } = Math; // 将Math.min函数抽取为min，便于使用
  const n = boxes.length;
  boxes.unshift([-1, 0]);
  const dp = Array<number>(n + 1).fill(Infinity);
  dp[0] = 0;

  let weightSum = 0;
  let tripSum = 0;
  let lastPort = -1;
  let j = 0, lastj = 0;
  // 循环处理箱子
  for (let i = 1; i <= n; i++) {
    // find the longest valid window [i:j]
    // 多条件时按行拆分更加清晰
    while (
      j + 1 <= n &&
      j + 1 - i + 1 <= maxBoxes &&
      weightSum + boxes[j + 1][1] <= maxWeight
    ) {
      j += 1, weightSum += boxes[j][1];
      if (boxes[j][0] != boxes[j - 1][0]) tripSum += 1;
      if (boxes[j][0] != lastPort) {
        lastPort = boxes[j][0]; // 记录最后一个遇到的码头
        lastj = j;
      }
    }
    // update dp[j]
    dp[j] = min(dp[j], dp[i - 1] + tripSum + 1);
    // in some cases, update dp[lastj-1], where [lastj:j] share the same port.
    if (j + 1 <= n && boxes[j][0] == boxes[j + 1][0]) {
      // 太长的最好别放在一行，花括号
      dp[lastj - 1] = min(dp[lastj - 1], dp[i - 1] + tripSum);
    }
    weightSum -= boxes[i][1];
    // Number将true转化为1，将false转为0
    tripSum -= Number(i + 1 <= n && boxes[i][0] != boxes[i + 1][0]);
  }
  return dp[n];
}