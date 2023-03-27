// https://leetcode.cn/problems/house-robber/
// 新增状态记录，dp寻找后续能偷到的最大金额
function rob(nums: number[]): number {
  const n = nums.length;
  if (n == 1) return nums[0];
  if (n == 2) return Math.max(...nums);
  // 其实两个变量即可，尽可能多偷，找临近
  // 还是数组逻辑性强一些
  const robRes = new Array(n);
  robRes[n - 1] = nums[n - 1];
  robRes[n - 2] = nums[n - 2];
  // 注意max只能统计非临近，因此这里直接n-1
  let robMax = robRes[n - 1];
  for (let i = n - 3; i >= 0; i--) {
    // 看当前不偷还是偷再加后续更高
    robRes[i] = Math.max(robRes[i + 1], nums[i] + robMax);
    // 更新最大值
    if (robRes[i + 1] > robMax) robMax = robRes[i + 1];
  }
  // 从第一还是第二个开始
  return Math.max(robRes[0], robRes[1]);
};