// https://leetcode.cn/problems/minimum-length-of-string-after-deleting-similar-ends/
// 模拟，双指针移动贪心删除字母
function minimumLength(s: string): number {
  // 贪心，从前缀开始记录字母，然后在后缀尽可能的找对应字母去删除
  let l = 0, r = s.length - 1;
  let del = s[l] == s[r]; // 只有前后相同才有机会删除
  while(del && l < r){
    const chNow = s[l];
    // 前后分别移动到非该字符，注意不能重叠
    while(s[l] == chNow && l < r) l++;
    while(s[r] == chNow && r > l) r--;
    // 此时l和r都位于非chNow字符或者相遇，因此继续判断能否删除
    // console.log(l, s[l], r, s[r]);
    // 如果相遇有两种情况：恰好删除完和只剩一个
    // 恰好删除完需要chNow和l以及r位置的相同，否则是只剩一个
    if(l == r && chNow == s[l]) return 0;
    else del = s[l] == s[r];
  }
  return r - l + 1; // 根据脚标看有多少数字
};