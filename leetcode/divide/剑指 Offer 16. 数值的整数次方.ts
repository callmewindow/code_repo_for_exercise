// https://leetcode.cn/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
// 递归法实现二分，果然超时
function myPow(x: number, n: number): number {
  // 处理小于0的情况，不然的话不管是判断正负还是计算中点都很麻烦
  if (n < 0) x = 1 / x, n *= -1;
  if (n == 1) return x;
  if (n == 0) return 1;
  // 位运算代替floor
  let sonN = n >> 1;
  // 根据奇偶把n拆开处理
  if (n % 2 == 1) return myPow(x, sonN) * myPow(x, sonN) * x;
  else return myPow(x, sonN) * myPow(x, sonN);
};

// 还是递归，增加了负数和边界处理
function myPow_1(x: number, n: number): number {
  // 处理特殊情况
  if (n == -1) return 1 / x;
  if (n == 1) return x;
  if (n == 0) return 1;
  // 位运算代替floor
  let sonN: number;
  // 处理小于0的情况，不然的话不管是判断正负还是计算中点都很麻烦
  // 注意n有可能为负数最小值，此时直接-1会导致溢出，所以不在这里处理n，而是处理sonN
  if (n < 0) {
    // 考虑到负数用位运算会导致小1，所以对n先+1来修正误差
    sonN = (n + 1) >> 1;
    sonN *= -1; // 注意变正
    x = 1 / x;
  } else {
    sonN = n >> 1;
  }
  let sonPow = myPow(x, sonN);
  // 根据奇偶把n拆开处理，提前计算son，防止荣冗余的二次调用
  if (n % 2 == 1 || n % 2 == -1) return sonPow * sonPow * x;
  else return sonPow * sonPow;
};