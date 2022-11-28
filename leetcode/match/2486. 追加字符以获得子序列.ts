// https://leetcode.cn/problems/append-characters-to-string-to-make-subsequence/
// 按顺序双指针匹配即可，记录最大长度差
function appendCharacters(s: string, t: string): number {
  // 即寻找最大匹配子序列
  // 因为只能在后面拼接，所以从前向后找即可
  const sLen = s.length;
  // let match: number[] = Array(sLen);
  let tI = 0;
  // 发现其实不需要match
  if (s[0] == t[tI]) tI++;
  for (let i = 1; i < sLen; i++) {
    // 匹配时移动tI
    // if(s[i] == t[tI]) match[i] = match[i-1] + 1, tI++;
    if (s[i] == t[tI]) tI++;
  }
  // 最大匹配数即tI
  return t.length - tI;
};