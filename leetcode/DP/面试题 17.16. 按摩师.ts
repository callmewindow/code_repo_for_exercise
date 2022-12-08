// https://leetcode.cn/problems/the-masseuse-lcci/
// 基础dp实现计算
function massage(nums: number[]): number {
  // dp记录当前接受预约能得到的总长度
  const n = nums.length;
  if(!n) return 0;
  let dp = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    // 如果当前接受了就结束了，则就等于自己
    // 注意需要跳过1才是下一个可以接的
    // if (i + nums[i] + 1 > n - 1) dp[i] = nums[i]; // 原来不是根据预约时间来跳过
    if (i + 2 > n - 1) dp[i] = nums[i];
    else {
      // 如果没有超过，则去选择最优的
      dp[i] = nums[i] + Math.max(...dp.slice(i+2)); // 其实因为是倒叙，不拆分也可以
    }
    // console.log(dp);
  }
  // 返回数组里的最大值即可
  return Math.max(...dp);
};