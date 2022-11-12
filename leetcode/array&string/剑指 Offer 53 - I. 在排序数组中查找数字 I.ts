// https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/
// 左右找角标判断次数
function search(nums: number[], target: number): number {
  let lI = 0, rI = nums.length;
  // 从左找
  while (lI < nums.length && nums[lI++] != target) { }
  // 没找到则直接返回，找到了lI会多一位
  if (lI >= rI && nums[lI - 1] != target) return 0;
  // 找到了肯定有target，不用判断长度
  while (nums[--rI] != target) { }
  //差距就是重复次数
  return rI - (lI - 1) + 1;
};

// 二分法利用条件找两侧
function search_1(nums: number[], target: number): number {
  let lI: number, rI: number;
  // 先找右
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    // 小于等于就右移，因为要找的是右边界，大于tar的情况
    if (nums[m] <= target) l = m + 1;
    else r = m - 1;
  }
  // 退出时m和l都等于tar的右边，r=m-1即应该等于target
  rI = l;
  if (r >= 0 && nums[r] != target) return 0;
  // 找左
  l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    // 小于就右移，因为要找的是左边界，等于tar的情况
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  // 此时m等于最左的tar，r等于m-1，即最左的tar的左边
  lI = r;
  // 因为有右边界所以一定有左，不用再判断
  return rI - lI - 1;
};