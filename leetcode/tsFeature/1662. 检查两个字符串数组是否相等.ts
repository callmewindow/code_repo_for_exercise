// https://leetcode.cn/problems/check-if-two-string-arrays-are-equivalent/
// 原始的拼接判断方法
function arrayStringsAreEqual(word1: string[], word2: string[]): boolean {
  return word1.join('') == word2.join('');
};