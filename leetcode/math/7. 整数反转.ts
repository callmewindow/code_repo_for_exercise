// https://leetcode.cn/problems/reverse-integer
// 超越之前的自己
function reverse(x: number): number {
  // 判断正负，基于正数反转
  const symbol = x < 0 ? -1 : 1;
  const minNum = Math.pow(-2, 31);
  const maxNum = -1 * (minNum + 1)
  x *= symbol;
  let res: number = 0;
  let cnt = 0;
  for (let ch of x.toString().split('').reverse()) {
    const num = Number(ch);
    cnt++;
    // 为防止溢出，在cnt接近边界时判断是否会溢出（因为无法存储64位）
    // cnt=10时res可达的最大值即214748364，此时num也需要小于7，如果大于7，则最大为214748363，即floor((minNum-num)/10)
    // 但其实考虑到不会超范围，因此第一个数最大就是2，whatever，这样可以解决更多问题
    if (cnt == 10) {
      if (symbol) {
        if (res > Math.floor((maxNum - num) / 10)) return 0;
      } else {
        // 负数则需要调整一下用ceil获取最小的整除
        if (res > -1 * Math.ceil((minNum + num) / 10)) return 0;
      }
    }
    res = res * 10 + num;
    // console.log(cnt,res);
  }
  return res * symbol;
};