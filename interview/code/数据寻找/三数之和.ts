function findThree(nums: number[], target: number): number[][] {
  // 要找出所有符合情况的组合，但是没说不能排序
  // 为了减少寻找，将a+b+c=tar的问题转化为a+b=tar-c的问题
  // a和b从左找，c从右找

  // 或者固定a，即确保a的不重复，然后找所有符合的b和c，b和c用二数之和的双指针策略寻找
  const res: number[][] = [];
  // 排序便于寻找
  nums.sort((b, f) => b - f);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (i !== 0 && nums[i] === nums[i - 1]) continue; // 跳过相同的a
    const find = target - nums[i]; // 寻找的b+c
    let left = i + 1, right = n - 1;
    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum > target) {
        // 大于向小找
        right--;
      } else if (sum < target) {
        // 小于向大找
        left++;
      } else {
        // 等于先记录
        res.push[nums[i], nums[left], nums[right]];
        // 同时缩小
        left++;
        right--;
        // 但注意需要跳过重复的，即需要while
        // 如果不提前+和-，最后只能判断和下一个不重复，没法判断和前一个是否重复
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (right > left && nums[right] === nums[right + 1]) right--;
      }
    }
  }
  return res;
}