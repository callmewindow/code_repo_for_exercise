// https://leetcode.cn/problems/determine-if-string-halves-are-alike
// 直接遍历判断元音
// set理论上更快
const meta = new Set(['a','e','i','o','u','A','E','I','O','U'])
function halvesAreAlike(s: string): boolean {
  // 判断两侧是否存在相同数目的原因
  // 从两侧开始递增递减，遍历判断是最简单的方法
  let l = s.length;
  let lCnt = 0, rCnt = 0;
  for(let i = 0,j = l - 1;i<l/2;i++,j--){
    if(meta.has(s[i])) lCnt++;
    if(meta.has(s[j])) rCnt++;
  }
  return lCnt == rCnt;
};