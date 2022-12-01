// https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/
// 排序方法，因为超过一半，所以排序后中位数一定是该数字
function majorityElement(nums: number[]): number {
  nums.sort((b,f)=>b-f);
  return nums[nums.length>>1]; // 小于32位上限，直接右移替代floor
};

// 摩尔计数法，一个非常神奇的解法，现在还不会，先空着
