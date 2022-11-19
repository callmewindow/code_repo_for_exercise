// https://leetcode.cn/problems/qiu-12n-lcof/
// 朴素dp
function sumNums(n: number): number {
  if (n == 0) return 0;
  return n + sumNums(n - 1);
};