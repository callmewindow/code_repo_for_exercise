// https://leetcode.cn/problems/number-of-different-integers-in-a-string/
// 处理为数字字符串数组后对数字字符串进行set记录，bigint转化
const numCh = new Set(['0','1','2','3','4','5','6','7','8','9']);
function numDifferentIntegers(word: string): number {
  let numSet: Set<bigint> = new Set();
  // 先字母变空格并去除多余空格
  word = Array.prototype.map.call(word, (ch) => numCh.has(ch) ? ch : ' ').join('').trim();
  // 按空格拆分数组
  let numList = word.split(' ');
  for(const num of numList){
    if(num.length == 0) continue; // 抛弃空字符串
    const tmp = BigInt(num);
    if(!numSet.has(tmp)) numSet.add(tmp);
  }
  return numSet.size;
};

// 用正则获取前导零长度并记录字符串
const numCh = new Set(['0','1','2','3','4','5','6','7','8','9']);
function numDifferentIntegers(word: string): number {
  let numSet: Set<string> = new Set();
  // 先字母变空格并去除多余空格
  word = Array.prototype.map.call(word, (ch) => numCh.has(ch) ? ch : ' ').join('').trim();
  // 按空格拆分数组
  let numList = word.split(' ');
  for(let num of numList){
    if(num.length == 0) continue; // 抛弃空字符串
    const tmp = num.match(/^00*/g); // 获取前导零长度
    if(tmp != null) num = num.slice(tmp[0].length); // 去除前导零
    // console.log(num);
    if(!numSet.has(num)) numSet.add(num);
  }
  return numSet.size;
};