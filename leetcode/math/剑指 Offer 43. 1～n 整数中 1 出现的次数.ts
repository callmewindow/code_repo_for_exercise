// https://leetcode.cn/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/
// 按顺序根据数位情况计算1数量并合并
function countDigitOne(n: number): number {
  // 只需计算n在各个位上分别的数即可

  // 个位数：n大于等于1则出现1次
  // 十位数：n-1（不算上个位的这一次）大于等于1则出现过n-1+1次
  // 百位数：n-1（不算上十位的），出现过

  // 按顺序记录各位数时出现的1次数即可
  let ans = 0;
  let mul10 = 1; // 记录当前的数位
  // 统计n的数位上限，尽量不使用大数
  let cnt = 0;
  let bp = n;
  while (bp > 0) {
    bp = Math.floor(bp / 10);
    cnt++;
  }
  console.log(cnt);
  let i = 0;
  while (i < cnt) {
    let high = Math.floor(n / mul10); // 记录超过mul10的高位
    let low = n % mul10; // 记录低于mul10的低位
    let cur = high % 10; // 记录mul10位置的数，判断，0，1，大于1
    high = Math.floor(high / 10); // 保留cur之前的部分
    if (cur > 1) {
      ans += ((high + 1) * mul10); // 超过1说明1的mul10个都被取到了，直接加
    } else if (cur == 1) {
      ans += (high * mul10 + low + 1); // 否则只出现了low+1次
      // 即例如1123要计算百位数的情况，首先对于千位，百位的1出现了1次，所以1*100
      // 对于百位开始的100，101到123，则出现了low+1，即23加上100的1
    } else {
      // 当等于零时，百位只可能在千位时出现，即11xx，21xx等情况
      // 因为遍历了从1000到1999
      ans += high * mul10;
    }
    mul10 *= 10;
    i++;
  }
  return ans;
};
