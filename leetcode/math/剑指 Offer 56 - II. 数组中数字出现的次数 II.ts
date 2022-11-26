// https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/
// 直接排序硬判断
function singleNumber(nums: number[]): number {
  // 没限制，我直接排序找唯一
  nums.sort((b, f) => b - f);
  const nLen = nums.length;
  return nums.filter((num, i, nums) => {
    if (i == 0 && num != nums[i + 1]) return true;
    if (i == nums.length - 1 && num != nums[i - 1]) return true;
    if (num != nums[i - 1] && num != nums[i + 1]) return true;
  })[0]; // 只有一个所以返回0
};

