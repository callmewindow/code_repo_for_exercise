// https://leetcode.cn/problems/check-if-number-is-a-sum-of-powers-of-three/
// 找规律，通过和3做除法来判断能否满足要求
function checkPowersOfThree(n: number): boolean {
  // 理论上也算一种拆分，不断尝试将n除以3，如果n是三的幂的和有两种情况
  // 1:不包含3的0次幂，即1，可以整出，2:包含1，无法整除，则说明n-1一定可以整除
  // 一直除3循环直到n==1（3的0次幂）即可
  while (n != 1) {
    let tmp = n / 3;
    if (tmp % 1 != 0) {
      tmp = (n - 1) / 3; // 不是整数则减一后再尝试
      // 如果还不是整数则说明不符合正常情况，直接false
      if (tmp % 1 != 0) return false;
    }
    n = tmp; // 替换n的值继续处理
  }
  return true;
};

// 用转化机制的方法，如果满足条件即3进制都是1，使用技巧
function checkPowersOfThree_2(n: number): boolean {
  return !n.toString(3).includes("2");
};