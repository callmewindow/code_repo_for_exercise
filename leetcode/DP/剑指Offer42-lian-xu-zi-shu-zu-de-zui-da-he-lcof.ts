// https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof
// 两个位置分别保存当前值是否记录来实现动态
function maxSubArray(nums: number[]): number {
  // 连续的数组，因此在每个位置记录该位置开始，保存后面若干个元素的连续子数组最大和
  // 用两个值分别保存记录当前值和不记录当前值的情况
  // 这样dp[0]判断记录或不记录哪个最大就是就是最大的连续子数组和
  const nLen = nums.length
  let maxSubSum = Array(nLen)
    .fill(0)
    .map(
      () => Array(2).fill(Number.MIN_SAFE_INTEGER)
    );

  // 初始化边界值，记录就是自身+后面的所有，不记录就是最小值
  maxSubSum[nLen - 1][0] = nums[nLen - 1];
  for (let i = nLen - 2; i >= 0; i--)
    maxSubSum[i][0] = nums[i] + maxSubSum[i + 1][0];
  // console.log(maxSubSum);

  for (let i = nums.length - 2; i >= 0; i--) {
    // 如果记录当前值，则该值就等于后面记录了的值和自身进行比较
    maxSubSum[i][0] = Math.max(nums[i], nums[i] + maxSubSum[i + 1][0]);
    // 如果不记录当前值，最大值就等于后一个数记录或不记录的最大值
    maxSubSum[i][1] = Math.max(maxSubSum[i + 1][0], maxSubSum[i + 1][1]);
    // console.log(maxSubSum);
  }

  return Math.max(...maxSubSum[0])
};