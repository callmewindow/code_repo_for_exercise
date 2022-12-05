// https://leetcode.cn/problems/second-largest-digit-in-a-string/
// 两个变量记录第一大和第二大，根据情况调整即可
const ascii0 = '0'.charCodeAt(0);
function secondHighest(s: string): number {
  let max1 = -1, max2 = -1;
  for (let ch of s) {
    const num = ch.charCodeAt(0) - ascii0;
    if (num >= 0 && num <= 9) { // 是数字开始判断大小
      // 只有当大于现在的最大值时才开始切换
      if (num > max1) [max1, max2] = [num, max1];
      else if (num < max1 && num > max2) max2 = num;
    }
  }
  return max2;
};