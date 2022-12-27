// https://leetcode.cn/problems/minimum-moves-to-convert-string/
// 直接贪心找X
function minimumMoves(s: string): number {
  // 每次替换三个连续字符，直接遇到X便替换即可
  // 替换后直接脚标+2到替换后的下一个再看，然后统计次数即可
  let i = 0, res = 0;
  const n = s.length;
  while (i < n) {
    if (s[i] === 'X') {
      res++;
      i += 3;
    } else i++;
  }
  return res;
};