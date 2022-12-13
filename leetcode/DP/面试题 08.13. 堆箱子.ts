// https://leetcode.cn/problems/pile-box-lcci/
// 最长上升子序列直接处理
function pileBox(box: number[][]): number {
  // 因为需要宽高和深都超过前面的才能堆起来，所以可以先排除一维
  box.sort((b, f) => b[0] - f[0]); // 先宽从小到大排列
  // console.log(box);
  // 然后对高和深做dp，找最长同时上升子序列
  const n = box.length;
  let dp = Array(n);
  dp[0] = box[0][2];
  for (let i = 1; i < n; i++) {
    dp[i] = box[i][2]; // 默认都是自己的高度
    // 从后向前找，找出最大值再返回
    let tmp = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (box[i][0] > box[j][0] && box[i][1] > box[j][1] && box[i][2] > box[j][2] && dp[j] > tmp) {
        tmp = dp[j];
      }
    }
    dp[i] += tmp; // 更新找到的最大值，没有即是0
    // console.log(dp);
  }
  // 因为不确定第几个是最高的，所以找最大值返回
  return Math.max(...dp);
};