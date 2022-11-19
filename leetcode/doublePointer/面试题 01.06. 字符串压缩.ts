// https://leetcode.cn/problems/compress-string-lcci/
// 按部就班，使用临时字符和临时计数来存储压缩效果
function compressString(S: string): string {
  let sNew = "";
  let sCnt: number;
  let chNow: string;
  let sLen = S.length;
  for (let i = 0; i < sLen; i++) {
    // 重新初始化字符和计数
    chNow = S[i];
    sCnt = 1;
    for (i++; i < sLen; i++) {
      if (S[i] == chNow) {
        sCnt++;
      } else {
        // 调整i的位置
        i--;
        break;
      }
    }
    // 填补压缩字符
    sNew += chNow + String(sCnt)
  }
  // 只有变短了才返回新的
  return sNew.length < sLen ? sNew : S;
};