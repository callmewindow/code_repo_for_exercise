// https://leetcode.cn/problems/permutations/
// 注意回溯的触底反弹，将值返回给原本的内容才能push好
function permute(nums: number[]): number[][] {
  if(nums.length === 1) return [[nums[0]]];
  // 因为是全排列不是全拆分，所以不需要二进制方式处理
  // 并且由于互不相同，所以直接回溯即可
  const n = nums.length;
  const res: number[][] = [];
  for (let i = 0; i < n; i++) {
    // 将剩余元素作为拼接在i后面的字符串，寻找他们的全排列
    const right = nums.slice(0, i).concat(nums.slice(i + 1, n));
    // console.log(right);
    const rightPermute = permute(right);
    for (let rightItem of rightPermute) {
      rightItem.unshift(nums[i]);
      res.push(rightItem);
    }
  }
  return res;
};