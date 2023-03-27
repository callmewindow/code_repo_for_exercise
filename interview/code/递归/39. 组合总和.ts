// https://leetcode.cn/problems/combination-sum/
// 寻找所有可能时为了避免对同一个数字的情况多次处理，应该将已经处理过的数字抛弃
function combinationSum(candidates: number[], target: number): number[][] {
  // 可以被多次取，直接回溯
  candidates.sort((b, f) => b - f); // 排序便于剪枝
  const n = candidates.length;
  const res: number[][] = [];
  for (let i = 0; i < n; i++) {
    const find = target - candidates[i];
    if (find === 0) {
      // 为0之后便不需要找本次了，因为所有值都是正数
      res.push([candidates[i]]);
      continue;
    }
    // 无法再找到则继续，再找也只会找到更大的
    if (find < candidates[0]) continue;
    if (find < 0) break; // 小于0则肯定找不到了，直接退出
    // 还能找就继续找
    // 注意，因为前一个的时候已经使用了所有可能，所以后续再寻找的时候要抛弃已经处理过的，即从当前元素之后再找
    const combination = combinationSum(candidates.slice(i,n), find);
    if (combination.length > 0) {
      // 有结果则记录
      res.push(...combination.map((comb) => {
        comb.unshift(candidates[i]);
        return comb;
      }))
    }
  }
  return res;
};