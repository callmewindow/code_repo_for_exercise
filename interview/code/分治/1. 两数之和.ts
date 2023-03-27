// https://leetcode.cn/problems/two-sum/
// 朴素的map记录策略
function findTwo(nums:number[], target:number): number[]{
  // 已经规定了数据类型，不需要判断类型
  // 两数之和达到tar，为了快速查找结果应该排序后寻找，但如果题目要求找出最先出现的一对，就不行了

  // 要么暴力，要么map记录
  // const numSet = new Set(nums); // 提前建立完整的set是没有必要的，因为相当于提前遍历了一次，没有必要
  const numSet = new Set();
  for(let num of nums){
    // 不需要脚标所以直接Set保存即可
    const find = target - num;
    // num是新的，所以find一定更靠前
    if(numSet.has(find)) return [find,target];
    else numSet.add(num);
  }
  return [];
}

// 二分法寻找第二个数
function twoSum(nums: number[], target: number): number[] {
  // 数组不递增且可能重复，负数，还是先排序再遍历
  let nL = nums.length;
  // 要输出原本的脚标，因此需要备份
  let nBP = nums.concat();
  nums.sort((b, f) => b - f);
  for (let i = 0; i < nL; i++) {
    // 小于tar时即退出，找下一个，i和j不会相遇，所以不用担心脚标重复
    const find = target - nums[i];
    let left = i + 1, right = nL - 1;
    // 一定找不到则continue
    if (nums[left] > find || nums[right] < find) continue;
    while (left <= right) {
      const mid = (left + right) >> 1;
      // 返回原本的脚标
      if (nums[mid] === find) {
        // 如果重复需要避免影响，找到更小的对其更新
        const i1 = nBP.indexOf(nums[i]);
        // 这里修改时需要避免让值等于find
        nBP[i1] = find + 1;
        return [i1, nBP.indexOf(nums[mid])];
      }
      if (nums[mid] > find) right = mid - 1;
      else left = mid + 1;
    }
  }
  return [];
};