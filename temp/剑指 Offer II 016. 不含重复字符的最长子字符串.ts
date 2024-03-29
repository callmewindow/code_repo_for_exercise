// https://leetcode.cn/problems/wtcaE1/
function lengthOfLongestSubstring(s: string): number {
  // 子序列可以不连续，子串是连续的

  // 最长连续，明显dp
  // 先初始化1，然后从最后开始，用一个set记录当前的最长连续不重复
  // 如果不重复，则当前脚标的值新增为后面一个数最长不连续的值+1
  // 如果发现重复，则从后一个脚标开始，循环找到那个重复的，然后将自己的值保存为这两个重复值之间的长度

  // 因为要连续，所以一旦出现了无法连续不重复的，就更新这个记录不重复字符的记录变量

  // 然后返回长度数组中最长的即可
  
};