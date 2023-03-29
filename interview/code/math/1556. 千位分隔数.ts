// https://leetcode.cn/problems/thousand-separator/
// 取余并根据长度补0
function thousandSeparator(n: number): string {
  if (n === 0) return '0';
  // 每隔三位一次，原本是正式的数字，因此直接1000取余获得最后三位即可
  let res = '';
  while (n > 0) {
    let right3 = String(n % 1000);
    n = Math.floor(n / 1000); // 取整
    // 这里根据right3长度和n的情况来判断是否补0
    if (n === 0) res = right3 + res;
    else {
      // 不够3也不是开头，则进行拼接
      while (right3.length < 3) right3 = '0' + right3;
      res = '.' + right3 + res;
    }
  }
  return res; // 不会包含最开始的点
};