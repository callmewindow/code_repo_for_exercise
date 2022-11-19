// https://leetcode.cn/problems/palindrome-permutation-lcci/
// 基础的字典统计数量判断
function canPermutePalindrome(s: string): boolean {
  // 若要回文只需最多只有一个字符出现的次数为奇数
  // 因此map统计次数
  let chMap = new Map();
  for (let ch of s) {
    let chNum = chMap.get(ch)
    if (chNum == undefined) chMap.set(ch, 1);
    else chMap.set(ch, chNum + 1);
  }
  let chCnt = chMap.values();
  // 记录是否有奇数字符出现
  let oddCnt = 0;
  for (let cnt of chCnt) {
    if (cnt % 2 == 1) {
      // 如果有多个奇数则不可能回文
      if (oddCnt == 1) return false;
      else oddCnt = 1;
    }
  }
  return true;
};

// 使用正则依次剔除字符，和数组思路类似
function canPermutePalindrome_1(s: string): boolean {
  // 利用正则替换掉重复字符，最后判断奇数字符数量是否大于1
  let oddCnt = 0;
  while (s.length) {
    // 用于判断本次剔除了多少个字符
    let oldLen = s.length;
    // replace需要传入字符串，因此使用slice
    let str = s.slice(0, 1);
    // 防止和正则规则重复，进行替换，因为不确定s字符组成
    if (str === '\\') str = '\\\\';
    s = s.replace(new RegExp(str, 'g'), '');
    // 如果变化的数是奇数，说明剔除了奇数
    if ((oldLen - s.length) % 2 == 1) oddCnt++;
  }
  return oddCnt > 1 ? false : true
};