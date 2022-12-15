// https://leetcode.cn/problems/sum-of-digits-of-string-after-convert/
// 得到初始数字串然后k次简易循环即可
function getLucky(s: string, k: number): number {
  // 转化成哪个数字，就把这个数字的数位和加到返回结果即可
  let res = '';
  const asciiA = 'a'.charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    const chNum = s[i].charCodeAt(0) - asciiA + 1;
    res += String(chNum);
  }
  while (--k >= 0) {
    // let bp = res; // 字符串不是高级数据结构，不是复制的引用，其实也不需要备份
    let num = 0;
    for (let i = 0; i < res.length; i++) num += Number(res[i]);
    res = String(num);
  }
  return Number(res);
};