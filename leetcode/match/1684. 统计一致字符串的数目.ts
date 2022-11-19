// https://leetcode.cn/problems/count-the-number-of-consistent-strings/
// 智慧的解法，利用字母和索引的对应关系
function countConsistentStrings(allowed: string, words: string[]): number {
  // 相当于判断words中的字符串是否由allowed中的字符组成
  // 最原始方法肯定是遍历words的字符串，然后再遍历allow，看是否每个字符都在allowed里面
  // 但考虑是小写字母，判断是否在allow中是可以用数组实现O(1)判断的，实现如下
  let allowArr = new Array(26).fill(0);
  let aCharCode = 'a'.charCodeAt(0);
  for (let ch of allowed) {
    allowArr[ch.charCodeAt(0) - aCharCode] = 1;
  }
  // 这里的allowArr也可以用set实现，原理都是判断是否存在
  // 此时只有allowArr中存在的字符，对应角标才是1
  let res = 0;
  let wAllow: boolean;
  for (let w of words) {
    wAllow = true;
    for (let ch of w) {
      // 如果是0则说明w不符合要求，退出
      if (!allowArr[ch.charCodeAt(0) - aCharCode]) {
        wAllow = false;
        break;
      }
    }
    res += wAllow ? 1 : 0;
  }
  return res;
};