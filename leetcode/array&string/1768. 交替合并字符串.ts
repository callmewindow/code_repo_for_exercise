// https://leetcode.cn/problems/merge-strings-alternately/
// 朴素的遍历方法
function mergeAlternately(word1: string, word2: string): string {
  let word_new: string = '';
  // 长短的两个长度
  let l_l = word1.length;
  let l_s = word2.length;
  // 长的字符串
  let str_l = word1;
  if (l_s > l_l) {
    let tmp = l_l;
    l_l = l_s;
    l_s = tmp;
    str_l = word2;
  }
  for (let i = 0; i < l_s; i++) {
    word_new += word1[i];
    word_new += word2[i];
  }
  word_new += str_l.slice(l_s, l_l);
  return word_new;
};