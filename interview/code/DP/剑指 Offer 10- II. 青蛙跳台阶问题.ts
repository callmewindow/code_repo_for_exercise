// https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/
// 常数dp
const mod = 1000000007;
function numWays(n: number): number {
  // 倒序向前，可能很大，所以不设立数组，直接计算
  if (n == 0 || n == 1) return 1;
  if (n == 2) return 2;
  // 从3开始
  let num_now = 3;
  let num_1 = 2, num_2 = 1; // 表示当前位置-1和-2位置的可能性数量
  let num_0: number = 0; // 当前的可能性
  while (num_now <= n) {
    num_0 = (num_1 + num_2) % mod;
    [num_2, num_1] = [num_1, num_0];
    num_now++;
  }
  return num_0;
}