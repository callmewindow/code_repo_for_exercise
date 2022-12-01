// https://leetcode.cn/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/
// 按数字数量找规律定位数字，进而返回即可
function findNthDigit(n: number): number {
  if (n == 0) return 0;
  // 1个1位，9个1位，90个2位，900个3位，9000个4位
  // 找到n的范围
  let rangeLo = 1, rangeHi = 1;
  let lenCnt = 1, numCnt = 9; // 分别记录某长度数字区域的位数和对应数量
  while (rangeHi <= n) {
    rangeLo = rangeHi;
    rangeHi += lenCnt * numCnt; // 当前区域数字的长度*数量
    lenCnt++, numCnt *= 10;
  }
  lenCnt--, numCnt /= 10; // 此时cnt和numCnt会到下一个区域，调整回当前区域
  let cnt = Math.floor((n - rangeLo) / lenCnt); // 当前区域n之前有多少位数
  let num = (numCnt / 9) + cnt; // 基于numCnt得到起点，加num得到n对应的数
  let index = (n - rangeLo) - cnt * lenCnt; // n在对应数中的脚标
  // console.log(rangeLo, rangeHi, cnt, num, index);
  return Number(String(num)[index]); // 直接转为字符串输出对应脚标数字
};