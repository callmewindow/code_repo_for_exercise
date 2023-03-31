// https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/
// 递归计算后续情况进行处理
function find(n: number, m: number): number {
  if (n == 0) return 0;
  let x = find(n - 1, m);
  return (m + x) % n;
}
function lastRemaining(n: number, m: number): number {
  return find(n, m)
};