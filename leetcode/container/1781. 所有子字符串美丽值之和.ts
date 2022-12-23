// https://leetcode.cn/problems/sum-of-beauty-of-all-substrings/
// 技巧双循环统计高低频率
const chCodeA = 'a'.charCodeAt(0);
const bpCnt = new Array(26).fill(0);
function beautySum(s: string): number {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    // 因为统计的时候只统计子串的，所以重新初始化更加方便，防止后面的影响前面的
    const cnt = bpCnt.concat(); // 基于备份搭建数组，但其实效率和新建一个一样
    // console.log(cnt);
    let maxFreq = 0;
    // 子字符串没特殊说明就是指连续的子字符串
    for (let j = i; j < s.length; j++) {
      // 统计i到j之间的字符频率，这样可以统计i开始直到结束的所有情况
      cnt[s[j].charCodeAt(0) - chCodeA]++;
      // 有一个新的增加的，才有可能更新最大频率，没必要每次循环
      maxFreq = Math.max(maxFreq, cnt[s[j].charCodeAt(0) - chCodeA]);
      // let minFreq = s.length; // 选择一个最大值
      let minFreq = 500; // 选择一个最大值
      for (let k = 0; k < 26; k++) {
        // 统计非0的最低频率
        if (cnt[k] > 0) minFreq = Math.min(minFreq, cnt[k]);
      }
      res += maxFreq - minFreq;
    }
  }
  return res;
};