// https://leetcode.cn/problems/nge-tou-zi-de-dian-shu-lcof/
// 记录n-1个骰子的情况，n个骰子只相当于多了一个1/6的概率，遍历n-1便可清晰的实现
function dicesProbability(n: number): number[] {
  // n为几，最小为n*1，最大的数量为n*6
  // 1:1，2，3，4，5，6
  // 2:2(11)，3(12,21)，4(13,22,31)，5(14,23,32,41)，6(15,24,33,42,51)
  // 7(16,25,34,43,52,61)，8(26,35,44,53,62)，9(36,45,54,63)，10(46,55,64)，11(56,65)，12(66)

  let res = Array(7).fill(1 / 6); // 初始化1个骰子的数组，多一位使i的概率放在i位置
  let cnt = 2;
  while (cnt <= n) {
    const maxCnt = cnt * 6;
    let dp = Array(maxCnt + 1).fill(0); // 因为要遍历旧数组，所以建立新数组
    dp[0] = res[0]; // 用位置0记录六分之一

    // res保存cnt-1个骰子时不同数字的情况，dp保存cnt时的情况
    // dp的情况从cnt一直到cnt*6，每个dp[i]由一个res[j]和一个1～6的数相乘而成
    // res的情况从cnt-1一直到(cnt-1)*6，因此直接遍历res，符合条件增加概率即可
    for (let i = cnt - 1; i <= maxCnt - 6; i++)
      for (let j = 1; j <= 6; j++)
        dp[i + j] += res[i] * res[0]; // 一定符合范围，直接增加即可
    // dp[i + j] += res[i];
    // for (let i = cnt; i <= maxCnt; i++) dp[i] *= res[0]; // 这样统一乘可以减少运算次数，更快
    // 更新循环
    res = dp;
    cnt++;
  }

  return res.slice(n, n * 6 + 1); // 取对应范围返回
};

// 遍历n的数组来实现，并统一处理乘法
function dicesProbability_1(n: number): number[] {
  let res = Array(7).fill(1 / 6); // 初始化1个骰子的数组，多一位使i的概率放在i位置
  let cnt = 2;
  while (cnt <= n) {
    const maxCnt = cnt * 6;
    let dp = Array(maxCnt + 1).fill(0); // 因为要遍历旧数组，所以建立新数组

    // res保存cnt-1个骰子时不同数字的情况，dp保存cnt时的情况
    // dp的情况从cnt一直到cnt*6，每个dp[i]由一个res[j]和一个1～6的数相乘而成
    // res的情况从cnt-1一直到(cnt-1)*6

    // 为了减少循环，对dp进行循环拆分
    for (let i = cnt; i <= maxCnt; i++) {
      // cnt由1～6和一个cnt-1范围的数组成，看最少以及最大可以减到多少
      const maxMinus = i - (cnt - 1) >= 6 ? 6 : i - (cnt - 1);
      const minMinus = i - (maxCnt - 6) <= 1 ? 1 : i - (maxCnt - 6);
      for (let j = minMinus; j <= maxMinus; j++) dp[i] += res[i - j];
      dp[i] *= 1 / 6; // 统一乘1/6
    }

    // 更新循环
    res = dp;
    cnt++;
  }

  return res.slice(n, n * 6 + 1); // 取对应范围返回
};