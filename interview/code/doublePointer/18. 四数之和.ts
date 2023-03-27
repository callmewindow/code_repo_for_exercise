// https://leetcode.cn/problems/4sum/
// 规范的x数之和
function fourSum(nums: number[], target: number): number[][] {
  // 直接在三数之和基础上延伸，多增加一层循环
  const quadruplets = [];
  if (nums.length < 4) {
    return quadruplets;
  }
  nums.sort((x, y) => x - y);
  const length = nums.length;
  // 确保剩余数量足够一组
  for (let i = 0; i < length - 3; i++) {
    // 去重
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // 后续只会更大，已经大于则直接退出
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    // 如果最大也小于tar，则尝试找更大
    if (nums[i] + nums[length - 3] + nums[length - 2] + nums[length - 1] < target) continue;
    for (let j = i + 1; j < length - 2; j++) {
      // 重复之前操作，找三数之和
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
      if (nums[i] + nums[j] + nums[length - 2] + nums[length - 1] < target) continue;
      // 双指针收缩
      let left = j + 1, right = length - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);
          // 两端去重
          while (left < right && nums[left] === nums[left + 1]) left++;
          left++; // 等于下一个不重复的
          while (left < right && nums[right] === nums[right - 1]) right--;
          right--;
        } else if (sum < target) {
          // 这里其实也可以while去重，但没有必要，因为都是循环
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return quadruplets;
};