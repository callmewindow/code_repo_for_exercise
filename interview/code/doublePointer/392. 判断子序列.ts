// https://leetcode.cn/problems/is-subsequence/
// 双指针记录匹配情况
function isSubsequence(s: string, t: string): boolean {
  // 两个字符串，直接双指针
  const n = s.length, m = t.length;
  let cnt = 0;
  // 如果剩余不够了也退出，满足了也退出
  for (let i = 0; i <= m - (n - cnt) && cnt < n; i++) {
    // console.log(s[cnt], t[i]);
    if (s[cnt] === t[i]) cnt++;
  }
  return cnt === n;
}