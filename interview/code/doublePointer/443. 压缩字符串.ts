// https://leetcode.cn/problems/string-compression/
// cnt统计即可
function compress(chars:string[]): number{
  // 重复字符push总数，否则push自己
  // 但是需要在chars上修改，并且当出现多个字符，例如10，需要填两个字符
  // 只能常数额外空间，所以直接本地修改
  const n = chars.length;
  let cnt: number, charNow:string, cntStr: string;
  let newI = 0; // 记录更新后的chars的位置，便于删除剩余内容
  for(let i = 0;i<n;i++){
      cnt = 0;
      charNow = chars[i];
      while(chars[i] === charNow && i<n) cnt++,i++;
      // 因为数字字符串长度一定小于之前的长度，所以直接基于newI向后覆盖即可
      if(cnt === 1) chars[newI++] = charNow;
      else{
          chars[newI++] = charNow;
          // 按顺序插入cnt
          cntStr = String(cnt);
          for(let j = 0;j<cntStr.length;j++) chars[newI++] = cntStr[j];
      }
      // 此时i需要--，因为此时i不等于charNow，-1后+1才是正确的下一个
      i--;
  }
  // 此时newI脚标不是更新后的内容，但是大小恰好等于此前的长度，直接返回即可
  // 没要求删除剩余，直接返回
  return newI;
}