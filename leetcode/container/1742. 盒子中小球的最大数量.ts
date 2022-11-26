// https://leetcode.cn/problems/maximum-number-of-balls-in-a-box/
// 直接公式计算位数和用map记录次数
function countBalls(lowLimit: number, highLimit: number): number {
  // 将小球编号计算数位和，看哪个数位和出现的次数最多
  let bMap = new Map();
  while (lowLimit <= highLimit) {
    // 计算数位之和
    const tmp = String(lowLimit).split('').map((ch) => Number(ch)).reduce((f, b) => f + b);
    // 正常计算数位和，更快一点）
    // let tmp = 0, num = lowLimit;
    // while (num > 0) {
    //   tmp += num % 10;
    //   num = Math.floor(num / 10);
    // }
    if (!bMap.has(tmp)) bMap.set(tmp, 1);
    else bMap.set(tmp, bMap.get(tmp) + 1);
    ++lowLimit;
  }
  // 返回最大数量
  return Math.max(...bMap.values());
};

// 双百：好！优化：数组替代字典，记录最大值代替寻找，有需初始化代替fill0
function countBalls_1(lowLimit: number, highLimit: number): number {
  // 将小球编号计算数位和，看哪个数位和出现的次数最多
  // 因为最大就是99999，即45，所以直接声明数组为n*9+1
  let bMap = Array(String(highLimit).length * 9 + 1);
  let maxCnt = -1;
  while (lowLimit <= highLimit) {
    // 计算数位之和
    let tmp = 0, num = lowLimit;
    while (num > 0) {
      tmp += num % 10;
      num = Math.floor(num / 10);
    }
    // const tmp = String(lowLimit).split('').map((ch)=>Number(ch)).reduce((f,b)=>f+b);
    bMap[tmp] = bMap[tmp] == undefined ? 1 : bMap[tmp] + 1;
    if (bMap[tmp] > maxCnt) maxCnt = bMap[tmp]; // 提前计算节省时间
    ++lowLimit;
  }
  // 返回最大数量
  return maxCnt;
};