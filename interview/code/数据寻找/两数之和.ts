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
    else numSet.add(find);
  }
  return [];
}