// https://leetcode.cn/problems/two-sum/
// 排序后遍历实现，居然没超时
function twoSum(nums: number[], target: number): number[] {
  // 数组不递增且可能重复，负数，还是先排序再遍历
  let nL = nums.length;
  // 要输出原本的脚标，因此需要备份
  let nBP = nums.concat();
  nums.sort((b, f) => b - f);
  for (let i = 0; i < nL; i++)
    // 小于tar时即退出，找下一个，i和j不会相遇，所以不用担心脚标重复
    for (let j = nL - 1; nums[i] + nums[j] >= target; j--)
      if (nums[i] + nums[j] == target) {
        const iI = nBP.indexOf(nums[i]);
        // 同一位置的数不能用多次，如果相同需要替换i避免影响j
        if (nums[i] == nums[j]) nBP[iI] = nums[i] + 1;
        return [iI, nBP.indexOf(nums[j])]
      }
  return [];
};