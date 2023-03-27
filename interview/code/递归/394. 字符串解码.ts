// https://leetcode.cn/problems/decode-string/
// 优化代码，递归处理模式串
const ascii0 = '0'.charCodeAt(0);
const ascii9 = '9'.charCodeAt(0);
function decodeString(s: string): string {
  // 每一个数字都表示重复多少次，首先匹配当前字符串有多少个模式串
  // 对重复模式串进行独立计算，然后利用字符串进行拼接

  // 不能想的太复杂，找模式串直接看方括号
  const n = s.length;
  let res = '';
  let i = 0;
  while (i < n) {
    // 一定合法所以直接判断字母
    const iType = checkType(s[i]);
    if (iType == 2) {
      res = res + s[i++];
    } else {
      // 不可能遇到方括号，因为合规
      // 统计当前模式串重复多少次
      let cnt = '';
      let numI = i;
      while(checkType(s[numI]) == 1) cnt += s[numI++];
      // console.log(cnt);
      // 将方括号内容进行捕获
      let leftCnt = 1; // 记录左括号数量
      let leftI = numI + 1; // 此时numI位置在[
      let rightI = leftI; // 有可能有[]，虽然貌似不能有[]
      while (leftCnt > 0) {
        if (s[rightI] == '[') leftCnt++;
        else if (s[rightI] == ']') leftCnt--;
        rightI++;
      }
      // 此时rightI恰好在和开头[匹配的]的下一个位置，得到模式串
      const pattern = s.slice(leftI, rightI - 1);
      // console.log(pattern);
      res = res + decodeString(pattern).repeat(Number(cnt));
      i = rightI; // 更新当前位置
    }
  }
  return res;
};

function checkType(ch: string): number {
  // 0为方括号，1为数字，2为字母
  if (ch == '[' || ch == ']') return 0;
  const chCode = ch.charCodeAt(0);
  if (chCode >= ascii0 && chCode <= ascii9) return 1;
  return 2;
}