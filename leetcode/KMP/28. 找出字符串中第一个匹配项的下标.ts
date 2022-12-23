// https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
// 知乎kmp解法
function strStr(haystack: string, needle: string) {
  const n = haystack.length, m = needle.length;
  if (m === 0) return 0;
  // 定义kmp中模式串的next数组，默认是-1
  const next = new Array(m).fill(-1);
  // 从第第一个字符开始
  let i = 0, j = -1; // i表示遍历的脚标，j表示next寻找时的脚标
  while (i < m) {
    if (j == -1 || needle[i] == needle[j]) {
      // 如果头部开始或者ij相等，则说明i的next可以是j
      ++i, ++j;
      next[i] = j;
    } else j = next[j]; // 如果不相等则一直基于next找下一个可能的脚标，尝试找i的next
  }
  i = 0, j = 0; // 开始找主串中匹配串的情况
  while (i < n && j < m) {
    if (j == -1 || haystack[i] == needle[j]) {
      i++, j++; // 当匹配则一起向后走
    }
    else j = next[j]; // 不匹配则恢复到下一个最可能的位置
  }
  // 成功则需要i减去j，才是起始点，否则-1
  return j == m ? i - j : -1;
};

// 力扣官方kmp解法
function strStr(haystack: string, needle: string) {
  const n = haystack.length, m = needle.length;
  if (m === 0) return 0;
  const next = new Array(m).fill(0); // 0默认回到模式串开头
  // 从第二个字符开始
  for (let i = 1, j = 0; i < m; i++) {
    // 不断尝试找i和j匹配的情况，或者完全不匹配，定位到开头的情况
    while (j > 0 && needle[i] !== needle[j]) j = next[j - 1];
    // 注意，如果i==j，说明从0到j都是匹配的，因此next还需要后移一位，即j++
    if (needle[i] == needle[j]) j++;
    next[i] = j; // 根据j的值记录i位置的next脚标
  }
  for (let i = 0, j = 0; i < n; i++) {
    // 不断尝试找匹配或者不匹配的情况
    while (j > 0 && haystack[i] != needle[j]) j = next[j - 1];
    // 如果匹配则匹配的脚标j进行++
    if (haystack[i] == needle[j]) j++;
    // 当匹配成功返回开始的脚标，因为i没有++，此时i的位置是模式串的最后一位
    // 所以对应脚标示i-(m-1)
    if (j === m) return i - m + 1;
  }
  return -1;
};