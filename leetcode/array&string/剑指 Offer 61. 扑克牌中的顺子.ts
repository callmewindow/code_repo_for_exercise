// https://leetcode.cn/problems/bu-ke-pai-zhong-de-shun-zi-lcof/
// 排序后按顺序处理间隔
function isStraight(nums: number[]): boolean {
  // 若干幅扑克牌，可能有多个重复数字，如果重复不可能连续
  // 根据案例测试，不存在JQKA2这种顺子，即顺序只有1～13，0可以任意用
  nums.sort((b, f) => b - f); // 先从小到大排序
  let cnt0: number = 0;
  for (let num of nums) if (!num) cnt0++; // 记录0的个数

  // 从0后开始看是否递增
  for (let i = cnt0; i < 4; i++) {
    const inter = nums[i + 1] - nums[i];
    if (inter == 0) return false; // 重复的不可能
    if (inter == 1) continue; // 如果两个数差1，正常

    cnt0 -= inter - 1; // 否则需要用掉0来填补空缺
    if (cnt0 < 0) return false; // 如果没有0了则不是顺子
  }
  return true; // 如果有4个0，则不会循环，直接返回
};