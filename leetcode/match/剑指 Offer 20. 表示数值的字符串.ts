// https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/
// 编译原理词法分析，控制脚标判断情况即可
function isNumber(s: string): boolean {
  let len = s.length, i = 0;
  let type = 0; // 0表示不是数，1是整数，2是小数
  // 1.若干空格
  while (s[i] == ' ') i++;
  // 2.小数或整数
  //  符号字符
  if (s[i] == '+' || s[i] == '-') i++; // i超范围时会显示undefined，不用try获取异常
  //  数字或点
  //  先判断可能的数字
  if (s[i] != '.') {
    const before = i;
    while (s[i] >= '0' && s[i] <= '9') i++; // 跳过若干位数字
    if (i == before) return false; // 不是点则至少应一位数字
    type = 1; // 先当作整数
  }
  //  判断点，如果不是点，应该type=1，去判断e
  //  如果是点，则根据应该点前或后有数字才是小数，type=2，再去判断e
  if (s[i] == '.') {
    i++;
    const before = i;
    while (s[i] >= '0' && s[i] <= '9') i++; // 跳过可能的若干位数字
    if (type == 1 || i != before) type = 2; // 要么前面判断了，要么这里有
    else return false; // 否则不符合要求
  }
  // 3.可能的e或E
  if (s[i] == 'e' || s[i] == 'E') {
    i++;
    // e后是整数，判断整数
    if (s[i] == '+' || s[i] == '-') i++;
    const before = i;
    while (s[i] >= '0' && s[i] <= '9') i++; // 跳过若干位数字
    if (i == before) return false; // 整数需要至少有一位数字
  }
  // 如果还没有判断出整数或小数，则不符合要求
  if (type == 0) return false;
  // 4.若干空格
  while (i < len && s[i] == ' ') i++;
  if (i < len) return false; // 小于len则说明遇到了不是空格的，不符合要求

  return true;
};