// https://leetcode.cn/problems/letter-case-permutation/
// 利用移位处理所有可能情况，在遍历中穿插对字符的处理
function letterCasePermutation(s: string): string[] {
  // let t = s.replace(/[a-z,A-Z]/g,'0');
  // map匿名函数中接受的值是原本的类型，其他运算符也会适配其类型，例如字符串就会是拼接
  // console.log(sA.map((ch)=>ch+1));
  // console.log(sA.map((ch)=>String.fromCharCode(ch.charCodeAt(0)+1)));

  // 转为小写好处理
  let sA = s.toLowerCase().split('');
  // 记录字母出现的脚标，set后续检查更快
  let chI = new Set();
  let sL = sA.length;
  for (let i = 0; i < sL; i++) if ('a' <= sA[i] && sA[i] <= 'z') chI.add(i);
  let maxPos = 1 << chI.size; // 记录所有可能性的数量，用于mark循环

  let res: string[] = []; // 记录所有可能
  let resStr: string, chCnt: number; // 记录临时字符串和当前是第几个字符
  // 因为全0也是一种情况，即全小写，所以这里从0开始
  const inter = 'A'.charCodeAt(0) - 'a'.charCodeAt(0);
  for (let mark = 0; mark < maxPos; mark++) {
    resStr = "", chCnt = 0;
    for (let i = 0; i < sL; i++) {
      // 如果是字符，则和mark对比看状态，0小写，1大写
      if (chI.has(i)) {
        if (((1 << chCnt) & mark) == 0) resStr += sA[i];
        else resStr += String.fromCharCode(sA[i].charCodeAt(0) + inter);
        chCnt++; // 注意这里要++，以处理后面的字符
      } else resStr += sA[i];
    }
    res.push(resStr);
  }
  return res;
};