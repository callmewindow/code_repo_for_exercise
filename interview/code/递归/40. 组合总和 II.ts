// https://leetcode.cn/problems/combination-sum-ii/
// 朴素回溯寻找组合，多数之和
function combinationSum2(candidates: number[], target: number): number[][] {
  const n = candidates.length;
  if(n === 0) return [];
  // 先对candidates排序处理
  candidates.sort((b, f) => b - f);
  let sum = candidates.reduce((f, b) => f + b); // 记录剩余数总和，便于判断
  const res: number[][] = [];
  // console.log(candidates, target)
  for (let i = 0; i < n; i++) {
    if(i !== 0 && candidates[i] == candidates[i-1]) continue; // 去除重复情况
    // 一定不能组合成tar则直接返回
    // console.log(candidates[i], sum, target);
    if (sum < target || candidates[i] > target) return res;
    // 可能合成则开始找剩余内容
    const findNum = target - candidates[i];
    // console.log('find ',+ findNum);
    if (findNum === 0) {
      // 符合情况则直接增加res
      res.push([candidates[i]]);
    } else {
      // 否则直接递归找内容
      const resLeft = combinationSum2(candidates.slice(i + 1, n), findNum);
      if(resLeft.length > 0){
        // 有结果则追加当前数并push
        // console.log(resLeft);
        res.push(...resLeft.map((res)=>{
          res.unshift(candidates[i]); // 不能直接return这个，因为返回值不是res
          return res;
        }));
      }
      // console.log(res);
    }
    sum -= candidates[i]; // 更新剩余的总和
  }
  return res;
};