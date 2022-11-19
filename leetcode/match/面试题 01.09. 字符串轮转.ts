// https://leetcode.cn/problems/string-rotation-lcci/
// 拼接便捷判断
function isFlipedString(s1: string, s2: string): boolean {
  // 字符串旋转即把字符串前面连续的一部分放到末尾
  // 因为有重复的，所以不能直接基于s1搭建索引排序数组判断s2是否满足，而且因为旋转，肯定排序不同

  // 如果朴素判断，就是从1到n-2，遍历看是否符合情况，当s1两部分同时在s2时便符合

  // 如果是旋转的，则说明前面的是后半，后面的是前半，因此拼接后中间一定有一个s1，因此直接判断即可
  // 但是可能长度不同导致中间也存在s1，所以还需要判断长度
  return s1.length == s2.length ? (s2 + s2).includes(s1) : false;
};