// https://leetcode.cn/problems/longest-palindromic-substring/
// 两侧双指针循环处理，需注意扩增时对回文串类型的处理
function longestPalindrome(s: string): string {
  // 回文：不断右移，将i作为中心点然后进行扩展
  const n = s.length;
  let resStr = "";
  // 优化循环，后续利用check函数内实现对开头结尾的特殊处理即可
  for (let i = 0; i < n; i++) {
    // 如果以当前位置为中心一直到结尾都无法超过目前字符串的长度，则直接停下
    if (2 * (n - i) < resStr.length) break;
    // 因为要两侧延伸，所以两端不需要考虑
    let tmpStr = checkPalindrome(s, i);
    // console.log(tmpStr);
    // 遇到了更长的则更新
    if (tmpStr.length > resStr.length) resStr = tmpStr;
  }
  return resStr;
};

function checkPalindrome(s: string, i: number): string {
  const n = s.length;
  let res = s[i]; // 原始的回文子串
  let type = 0; // 0表示回文串是同一个字符，即aaa，1表示非这种情况，例如bab
  let l = i - 1, r = i + 1;
  // 需要考虑单向扩增的情况，因此应该是或
  while (l >= 0 || r < n) {
    // console.log(res, l, r, type);
    // 两侧相同直接延伸
    if (s[l] === s[r]) {
      res = s[l] + res + s[r];
      // 如果不相同，则说明一定是奇数回文串
      // console.log(s[l], s[i]);
      if (s[l] !== s[i]) type = 1;
      l--, r++; // l和r的调整应在判断后进行
    } else {
      // 此时需要看当前的类型
      if (type == 1) {
        // 如果已经是奇数回文串，必须两侧相等，所以直接退出
        break;
      } else {
        // 否则可以通过判断和s[i]来看能否延伸，因为如果type=0则说明目前res中都是s[i]
        // 考虑到是向左侧延伸的，所以只判断左侧
        if (s[l] == s[i]) {
          // 此时只接收左侧，然后切换类型，开始两侧同时判断
          res = s[l] + res;
          l--;
        } else {
          // 对于其他情况均可在后续判断中遍历到，所以直接跳过
          break;
        }
      }
    }
  }
  return res;
}