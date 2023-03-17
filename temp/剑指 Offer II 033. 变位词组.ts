// https://leetcode.cn/problems/sfvd7V/
function groupAnagrams(strs: string[]): string[][] {
  // 组合变位词
  // 首先一个大数组
  // 然后遍历strs，基于当前元素生成一个新数组，然后以当前字符串为基础，和其他字符串比较
  // 如果是变位词，则加入当前数组，并标记为已经被使用，直到遍历结束
  // 复杂度就是on2*m了
};