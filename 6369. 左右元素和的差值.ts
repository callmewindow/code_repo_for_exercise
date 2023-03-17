// https://leetcode.cn/problems/left-and-right-sum-differences/
// 直接前缀和-后缀和，i值会自动去除
function leftRigthDifference(nums: number[]): number[] {
  // 左侧元素和相当于前缀和-自身，右侧元素和同理
  // 但其实相减的过程中，元素也会被减去，所以直接减即可
  // 分别统计前缀和和后缀和
  const n = nums.length;
  let leftSum = new Array(n), rightSum = new Array(n);
  leftSum[0] = nums[0], rightSum[n - 1] = nums[n - 1];
  for (let i = 1; i < n; i++) {
    leftSum[i] = leftSum[i - 1] + nums[i];
    rightSum[n - i - 1] = rightSum[n - i] + nums[n - i - 1];
  }
  // console.log(leftSum, rightSum);
  return leftSum.map((v, i) => {
    return Math.abs(leftSum[i] - rightSum[i])
  });
}