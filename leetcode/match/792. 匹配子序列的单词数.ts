// https://leetcode.cn/problems/number-of-matching-subsequences/
// 直接暴力多重遍历
function numMatchingSubSeq(s: string, words: string[]): number {
  // 如果是子序列则不改变相对顺序，而因为s可能有重复字符，所以单纯检查顺序无法满足
  // 基础方法直接遍历，当匹配到了word就往后走，匹配成功就动，当结束也没成功则说明不对，感觉会超时
  const sLen = s.length;
  let wCnt = 0;
  for (let word of words) {
    const wLen = word.length;
    let chCnt = 0;
    for (let i = 0; i < sLen; i++) {
      if (s[i] == word[chCnt]) {
        chCnt++;
        if (chCnt == wLen) break;
      }
    }
    if (chCnt == wLen) wCnt++;
  }
  return wCnt;
};