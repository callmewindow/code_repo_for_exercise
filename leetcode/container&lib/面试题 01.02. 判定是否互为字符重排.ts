// https://leetcode.cn/problems/check-permutation-lcci/
// 应对所有情况的map统计数量
function CheckPermutation(s1: string, s2: string): boolean {
  // 相当于判断各个字符出现的次数
  // 因为没说字符串可能的字符类型，因此利用集合存储信息
  let sMap = new Map();
  for (let ch1 of s1) {
    let ch1Num = sMap.get(ch1);
    if (ch1Num == undefined) sMap.set(ch1, 1);
    else sMap.set(ch1, ch1Num + 1);
  }
  for (let ch2 of s2) {
    let ch2Num = sMap.get(ch2);
    // 出现不存在字符或数量多于s1则不对
    if (ch2Num == undefined || ch2Num <= 0) return false;
    else sMap.set(ch2, ch2Num - 1);
  }
  // 判断是否存在数量不匹配的
  let sVal = sMap.values();
  for (let val of sVal) {
    if (val != 0) return false;
  }
  return true;
};