// https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof
// 直接求解即可，两个dp
function numWays(n: number): number {
  const mod = 1000000007n;
  // 到n的跳法可以是从n-1跳一下上来，也可以n-2跳两下上来
  if (n == 0) return 1;
  if (n == 1) return 1;
  // 三个变量实现处理
  let num0 = 1n, num1 = 1n, num2 = 0n;
  for (let i = 2; i <= n; i++) {
    num2 = num0 + num1;
    num0 = num1;
    num1 = num2;
  }
  return Number(num2 % mod);
};