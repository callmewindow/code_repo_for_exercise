// https://leetcode.cn/problems/arithmetic-subarrays/
// 朴素循环，最大最小的到等差值，判断等差中第几项进行优化
function checkArithmeticSubarrays(nums: number[], l: number[], r: number[]): boolean[] {
  // 当小范围不能组成等差，大范围可能组成等差，无法单纯基于范围传递等差与否的概念
  // 每次都需要单独进行判断
  const n = l.length;
  const ans = [];
  for (let i = 0; i < n; ++i) {
    let left = l[i], right = r[i];
    // 寻找最大最小值，辅助判断是否是等差数组
    let minv = nums[left], maxv = nums[left];
    for (let j = left + 1; j <= right; ++j) {
      minv = Math.min(minv, nums[j]);
      maxv = Math.max(maxv, nums[j]);
    }

    if (minv === maxv) {
      ans.push(true);
      continue;
    }

    // 目前所有数据都是整数，因此数据差一定都是整数
    if ((maxv - minv) % (right - left) !== 0) {
      ans.push(false);
      continue;
    }

    const d = (maxv - minv) / (right - left);
    let flag = true;
    const seen = new Array(right - left + 1).fill(0);
    for (let j = left; j <= right; ++j) {
      // 通过判断和最小值的关系是否和等差成倍数看是否满足最低条件
      if ((nums[j] - minv) % d !== 0) {
        flag = false;
        break;
      }
      const t = Math.floor((nums[j] - minv) / d);
      // 如果当前项已经出现过了则肯定不会是真正的等差数列的项
      if (seen[t]) {
        flag = false;
        break;
      }
      seen[t] = true;
    }
    ans.push(flag);
  }
  return ans;
};