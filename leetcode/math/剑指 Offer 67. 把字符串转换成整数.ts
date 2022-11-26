// https://leetcode.cn/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/
// 简单模拟，类似词法分析，溢出需要多情况判断
function strToInt(str: string): number {
  let num: number = 0;
  let i = 0;
  while (str[i] == ' ') ++i; // 跳过空格
  if (!(str[i] == '-' || str[i] == '+' || (str[i] >= '0' && str[i] <= '9'))) return 0; // 不合法数字
  let negative: boolean = false;;
  // 处理正负符号
  if (str[i] == '-') {
    negative = true;
    ++i;
  } else if (str[i] == '+') ++i;
  if (!(str[i] >= '0' && str[i] <= '9')) return 0; // 不是数字则不合法
  // 下面开始统计数字，注意这里是从第一位开始统计
  // 而考虑到溢出的问题，最大连续出现的数字也就10位，超过上限时直接返回上限即可
  let numStr = '';
  while (str[i] == '0') ++i; // 跳过前面的若干0
  while (i < str.length && numStr.length <= 10 && (str[i] >= '0' && str[i] <= '9')) {
    numStr += str[i];
    ++i;
  }
  // 当小于等于10位或者第一位小于等于2则开始正常计算值
  const lowest = -2147483648, highest = 2147483647;
  const numLen = numStr.length;
  if (numLen < 10 || (numLen == 10 && numStr[0] <= '2')) {
    let pow10 = 1;
    if (numLen < 10 || (numLen == 10 && numStr[0] == '1')) {
      // 小于等于10位或者第一位等于1则直接计算返回
      for (let i = numLen - 1; i >= 0; --i) {
        num += (numStr.charCodeAt(i) - '0'.charCodeAt(0)) * pow10;
        pow10 *= 10;
      }
    } else {
      // 等于10位且首位为2时则在遍历九位时停下
      for (let i = 9; i >= 1; --i) {
        num += (numStr.charCodeAt(i) - '0'.charCodeAt(0)) * pow10;
        pow10 *= 10;
      }
      // 此时num根据正负情况来看是否溢出
      if (negative) {
        if (num > 147483648) return lowest;
        else num += 2 * pow10;
      } else {
        if (num > 147483647) return highest;
        else num += 2 * pow10;
      }
    }

  } else return negative ? lowest : highest;
  // 溢出值都在前面返回，这里肯定都是正数
  return negative ? -1 * num : num;
};