// https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof
// 基础实现
function fib(n: number): number {
  const modN = 1e9 + 7;
  let fibArr = [0, 1];
  if (n <= 1) return fibArr[n];
  for (let i = 2; i <= n; i++) {
    fibArr[i] = fibArr[i - 1] % modN + fibArr[i - 2] % modN;
  }
  // 此时n还没有被模
  return fibArr[n] % modN;
};

// 调整取模规则
function fib_1(n: number): number {
  const modN = 1e9 + 7;
  let fibArr = [0, 1];
  if (n <= 1) return fibArr[n];
  for (let i = 2; i <= n; i++) {
    // 调整运算规则，加快速度
    fibArr[i] = (fibArr[i - 1] + fibArr[i - 2]) % modN;
  }
  return fibArr[n];
};

// 大数存储，减少取模运算，两变量实现计算
function fib_2(n: number): number {
  if (n == 0) return 0;
  if (n == 1) return 1;
  // 加n声明为大数类型，防止溢出，减少取模运算加快时间
  let num1 = 0n, num2 = 1n;
  for (let i = 2; i <= n; i++) {
    // 搭建临时数组，不用再声明临时变量
    [num1, num2] = [num2, num1 + num2]
  }
  // 这里对太大的数强行转为Number可能会四舍五入
  // bigint计算需要类型一致，如果直接输出会带n，需要用Number转化一下
  return Number(num2 % 1000000007n)
}