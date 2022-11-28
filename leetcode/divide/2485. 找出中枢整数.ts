// https://leetcode.cn/problems/find-the-pivot-integer/
// 根据连续数字和的性质移动指针看两侧情况
function pivotInteger(n: number): number {
  // 首先计算n的总和
  const sumN = n * (n + 1) / 2;
  // 为了能拆成两部分，sumN应该是偶数，这里不对，拆开后中枢会使用两次，因此是(sumN+n)成为偶数，除以2应该是整数
  for (let i = 1; i <= n; i++) {
    const sumHalf = (sumN + i) / 2;
    // 不是整数则继续
    if (sumHalf != Math.floor(sumHalf)) continue;
    // 可以拆成两部分，看两部分之和都等于sumHalf才满足
    // 计算后部分时，需要i～n的和，所以n和减去i-1的和
    if (sumHalf * 2 == i * (i + 1) && sumHalf * 2 == (sumN * 2 - i * (i - 1))) return i;
  }
  return -1;
};