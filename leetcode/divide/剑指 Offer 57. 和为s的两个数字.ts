// https://leetcode.cn/problems/he-wei-sde-liang-ge-shu-zi-lcof/
// 找二分点加快遍历速度，还是会超时
function twoSum_1(nums: number[], target: number): number[] {
  // 数组递增且大于1，因此如果nums[i]大于tar便可退出，根据题意一定存在这种数
  let nL = nums.length;
  let i: number, j: number, m: number;
  // 直接双指针，为了提高双层循环速度，先找到大于tar/2的值的位置
  for (m = 0; m < nL; m++) if (2 * nums[m] > target) break;
  for (i = 0; i < nL; i++)
    for (j = m; nums[i] + nums[j] <= target; j++)
      if (nums[i] + nums[j] == target) return [nums[i], nums[j]];
  return [];
};

// 调整思路，根据递增的规律找最大可能等于tar的，而不是无脑遍历
function twoSum_2(nums: number[], target: number): number[] {
  // 数组递增且大于1，因此如果nums[i]大于tar便可退出，根据题意一定存在这种数
  let nL = nums.length;
  let i: number, j: number, r: number;
  // 先找到刚小于tar的值的位置()，以保证最小的和最大的进行加和
  for (r = nL - 1; r >= 0; r--) if (nums[r] < target) break;
  for (i = 0; i < nL; i++)
    for (j = r; nums[i] + nums[j] >= target; j--)
      // 当小于tar时便退出，开始找下一个
      if (nums[i] + nums[j] == target) return [nums[i], nums[j]];
  return [];
};