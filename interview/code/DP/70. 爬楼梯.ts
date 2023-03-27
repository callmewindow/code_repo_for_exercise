// https://leetcode.cn/problems/climbing-stairs/
// 数组中转，同步替换快速解决
function climbStairs(n: number): number {
  // 两个数记录两个位置的爬楼梯方法数量即可
  if(n === 1) return 1;
  if(n === 2) return 2;
  let nowPlus1 = 2, nowPlus2 = 1; // 记录当前一个台阶后和两个台阶后的方法数
  for(let i = n-3;i>=0;i--){
    [nowPlus1, nowPlus2] = [nowPlus1 + nowPlus2, nowPlus1];
  }
  return nowPlus1; // 此时恰好为第一个台阶方法数
};