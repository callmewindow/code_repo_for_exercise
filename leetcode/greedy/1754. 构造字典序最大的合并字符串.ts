// https://leetcode.cn/problems/largest-merge-of-two-strings/
// 双指针判断字符，选大的和长的
function largestMerge(word1: string, word2: string): string {
  // 为了确保字典序大，需要尽量让靠后的字符在前面
  // 每次选择第一个字符放在末尾，其实就是按顺序拼接字符串

  // 一种操作是无脑比较首字符，谁大谁在前面，貌似可行
  let merge = "";
  let i1 = 0, i2 = 0;
  const n1 = word1.length, n2 = word2.length;
  while (i1 < n1 && i2 < n2) {
    const pos1 = word1.charCodeAt(i1), pos2 = word2.charCodeAt(i2);
    let choice = 0; // 选择1还是2
    // 如果当前字符相同则向后走，看谁能更快找到更大的字符
    if (pos1 == pos2) {
      let move = 1;
      while ((i1 + move) < n1 && (i2 + move) < n2) {
        const m1 = word1.charCodeAt(i1 + move), m2 = word2.charCodeAt(i2 + move);
        if (m1 == m2) move++; // 相等继续走
        else {
          choice = m1 > m2 ? 1 : 2; // 否则谁大选谁
          break;
        }
      }
      // 如果有一个字符串先结束，则说明前面重合，此时的选择可以根据示例来看
      // 对于a和ab，选择短：aab，选择长：aba
      // 对于b和ba，选择短；bba，选择长：bba
      // 无脑选择长的
      if (choice == 0) { // 等于0说明全部重合，有一个先结束，选择没有结束的
        choice = i1 + move == n1 ? 2 : 1;
      }
    } else {
      // 不相等则谁大先要谁
      choice = pos1 > pos2 ? 1 : 2;
    }
    // console.log(word1[i1], word2[i2], choice);
    // 根据choice选择merge的
    if (choice == 1) {
      merge += word1[i1];
      i1++;
    } else {
      merge += word2[i2];
      i2++;
    }
  }
  // 把剩余的都加到merge
  while (i1 < n1) merge += word1[i1++];
  while (i2 < n2) merge += word2[i2++];
  return merge;
};