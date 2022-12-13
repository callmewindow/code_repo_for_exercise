// https://leetcode.cn/problems/sum-of-beauty-of-all-substrings/
// 基础双重循环
var beautySum = function(s) {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
      const cnt = new Array(26).fill(0);
      let maxFreq = 0;
      for (let j = i; j < s.length; j++) {
          cnt[s[j].charCodeAt() - 'a'.charCodeAt(0)]++;
          maxFreq = Math.max(maxFreq, cnt[s[j].charCodeAt(0) - 'a'.charCodeAt(0)]);
          let minFreq = s.length;
          for (let k = 0; k < 26; k++) {
              if (cnt[k] > 0) {
                  minFreq = Math.min(minFreq, cnt[k]);
              }
          }
          res += maxFreq - minFreq;
      }
  }
  return res;
};