// 计算十六进制数字（比如：0xeeeeeffffffc01abc）转成二进制数字之后，包含1的数量。

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // 数据可能非常大
  const num = (await readline());
  console.log(countBin1(num));
  console.log(countBin1ByMem(num));
})();

function countBin1(numStr: string): number{
  // 强行转2进制处理，肯定无法处理所有
  const num = Number(numStr);
  const binNum = num.toString(2);
  let cnt = 0;
  for(let i = 0;i<binNum.length;i++){
    if(binNum[i] == '1') cnt++;
  }
  return cnt;
}

function countBin1ByMem(numStr:string): number{
  let cnt = 0;
  for(let i =2;i<numStr.length;i++){
    const ch = numStr.charAt(i);
    // 一个16进制位=4个二进制bit，那么直接对每个字符算一算就ok了
    // 即十六进制的计算方式和2进制相同，直接基于数字计算即可
    if(ch == '0') cnt += 0;
    else if(ch == '1') cnt += 1;
    else if(ch == '2') cnt += 1;
    else if(ch == '3') cnt += 2;
    else if(ch == '4') cnt += 1;
    else if(ch == '5') cnt += 2;
    else if(ch == '6') cnt += 2;
    else if(ch == '7') cnt += 3;
    else if(ch == '8') cnt += 1;
    else if(ch == '9') cnt += 2;
    else if(ch == 'a') cnt += 2;
    else if(ch == 'b') cnt += 3;
    else if(ch == 'c') cnt += 2;
    else if(ch == 'd') cnt += 3;
    else if(ch == 'e') cnt += 3;
    else if(ch == 'f') cnt += 4;
  }
  return cnt;
}
