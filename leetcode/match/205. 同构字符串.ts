// https://leetcode.cn/problems/isomorphic-strings/
// map存不同字符，用id标识来判断
function isIsomorphic(s: string, t: string): boolean {
  // 将字符都一视同仁，只要之前没出现过，都是一个新的字符，使用map存储
  let chMapS = new Map();
  // 记录第几个出现的字符
  let cntS = 0;
  // 记录当前字符的编号
  let chS = 0;
  let chMapT = new Map();
  let cntT = 0;
  let chT = 0;

  for (let i = 0; i < s.length; i++) {
    chS = chMapS.get(s[i]);
    if (chS == undefined) {
      chMapS.set(s[i], cntS++);
      chS = cntS;
    }
    chT = chMapT.get(t[i]);
    if (chT == undefined) {
      chMapT.set(t[i], cntT++);
      chT = cntT;
    }
    if (chS != chT) return false;
  }
  return true;
};
// 用下标代替cnt
function isIsomorphic_optimize(s: string, t: string): boolean {
  for (let i = 0; i < s.length; i++) {
    // map是基于字符出现的频率确定单一性，但其实用第一次出现的下标也可以有相同作用
    // 因此直接indexof即可获取到某个字符在当前字符串中的位置
    if (s.indexOf(s[i]) != t.indexOf(t[i])) return false;
  }
  return true;
};