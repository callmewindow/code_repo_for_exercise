// https://leetcode.cn/problems/longest-substring-without-repeating-characters/
// 记录最长子串，判断重复再拆分
function lengthOfLongestSubstring(s: string): number {
  // 子串是连续的
  // 倒叙dp，确保dp[i]为从当前开始的最长不重复子串长度
  // 利用数组记录当前最长不重复子串，便于更新
  const n = s.length;
  if(n == 0) return 0;
  // const dp = new Array(n).fill(1);
  // 好像也不用dp，直接贪心即可
  let maxStr = s[n - 1];
  let maxLen = 1;
  for (let i = n - 2; i >= 0; i--) {
    const pos = maxStr.indexOf(s[i]);
    if (pos >= 0) {
      // 存在其中则需要截断并更新maxStr
      maxStr = s[i] + maxStr.slice(0, pos);
      // 此时变短，肯定maxLen不会增加了

      // 同时可以判断前面剩余的字符全加能否超过max，小优化
      if (maxLen >= i + maxStr.length) break;
    } else {
      // 不存在则直接拼接
      maxStr = s[i] + maxStr;
      maxLen = Math.max(maxLen, maxStr.length);
    }
  }
  return maxLen;
};