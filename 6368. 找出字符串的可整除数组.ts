// https://leetcode.cn/problems/find-the-divisibility-array-of-a-string/
// 无脑记录前i个字符串数字，肯定会溢出 
function divisibilityArray(word: string, m: number): number[] {
  // 相当于不断更新0～i的字符串生成的数字，判断能否被m整除
  // 为了节省时间，使用循环*10的处理方式，而不是Number直接转化
  const n = word.length;
  let div = new Array(n);
  let num = 0n;
  let newM = BigInt(m);
  for(let i = 0;i<n;i++){
    num = num*10n + BigInt(word.charCodeAt(i) - '0'.charCodeAt(0));
    // console.log(num);
    div[i] = num % newM == 0n ? 1 : 0;
  }
  return div;
};

// 利用取余性质，通过记录余数来实现更新
function divisibilityArray_1(word: string, m: number): number[] {
  // 相当于不断更新0～i的字符串生成的数字，判断能否被m整除
  // 为了节省时间，使用循环*10的处理方式，而不是Number直接转化
  const n = word.length;
  let div = new Array(n);
  let num = 0;
  for (let i = 0; i < n; i++) {
    // 这里注意num需要更新为取余m的值，如果一直记录0～i，一定会超出范围
    // 只记录%m的值也有同样效果
    // 因为1234%m = （1230 + 4）%m = 1230 % m + 4%m
    // = 123 * 10 % m + 4%m = 123%m*10 + 4%m
    // 所以每次只需记录余数，便可起到和0～i相同的效果
    num = (num * 10 + (word.charCodeAt(i) - '0'.charCodeAt(0))) % m;
    // console.log(num);
    div[i] = num == 0 ? 1 : 0;
  }
  return div;
};