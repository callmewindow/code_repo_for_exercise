// https://leetcode.cn/problems/count-number-of-homogenous-substrings/
// 找规律后按顺序统计情况
const mod = 1e9+7;
function countHomogenous(s: string): number {
  // 一个字符串的所有字符相同才是同构
  // 所以只需要统计连续统字符串出现的次数，然后他的数量就是n*(n+1)/2
  let i = 0, res = 0;
  const n = s.length;
  while (i < n) {
    const chNow = s[i];
    let cnt = 0;
    while (s[i] == chNow && i < n) cnt++,i++;
    // console.log(chNow, cnt);
    res += cnt*(cnt+1)/2;
    res %= mod; // 防止溢出
  }
  return res;
};