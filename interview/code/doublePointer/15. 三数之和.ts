// https://leetcode.cn/problems/3sum/
// 双指针收缩，对条件进行筛选优化
function threeSum(nums: number[]): number[][] {
  // 排序便于按顺序寻找组合
  nums.sort((b, f) => b - f);
  const n = nums.length;
  const res: number[][] = [];
  // 如果i大于0，则不可能再为0
  for (let i = 0; i < n - 2 && nums[i] <= 0; i++) {
    // 去除重复
    if (i !== 0 && nums[i] === nums[i - 1]) continue;
    const tar = 0 - nums[i]; // 需寻找的值
    // 双指针收缩
    let j = i + 1, k = n - 1;
    while (j < k) {
      // 如果最大或最小都可能都不会大于tar，则break
      if (2 * nums[j] > tar || 2 * nums[k] < tar) break;
      const left = nums[j] + nums[k];
      if (left === tar) {
        // 等于了需要双向收缩
        res.push([nums[i], nums[j], nums[k]]);
        j++, k--;
      } else {
        if (left > tar) k--;
        else j++;
      }
      // 也需要去重处理
      if (j > i + 1) while (nums[j] === nums[j - 1] && j < k) j++;
      // k不需要处理，因为i和j都会变
      // if (k < n - 1) while (nums[k] === nums[k + 1]) k--;
    }
  }
  return res;
};