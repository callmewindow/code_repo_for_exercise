// https://leetcode.cn/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof
// 尝试投机取巧正反来一遍判断，610/987
// 无法应对两侧都有重复字符的情况
function lengthOfLongestSubstring(s: string): number {
  if(s.length == 0) return 0;
  // 子字符串是连续的，子序列才是可以不连续的
  // 动态规划存储当前位置的最长无重复字符串
  // 同时初始化为自身字符
  // let subStrA = Array(s.length).fill(0).map((_,i) => s[i])
  let subStrA = s.split('');
  for(let i = 1;i<s.length;i++){
    // 如果当前字符没有出现在前一个的最长无重复子串，则加上
    if(subStrA[i-1].indexOf(s[i]) < 0)
      subStrA[i] = subStrA[i-1] + s[i];
    // 否则从当前位置开始，subStrA就是自己，不用动
    // console.log(subStrA)
  }
  let cntN = Math.max(...subStrA.map((s) => s.length));
  // 倒着来一遍
  subStrA = s.split('');
  for(let i = s.length - 2;i>=0;i--){
    if(subStrA[i+1].indexOf(s[i]) < 0)
      subStrA[i] = subStrA[i+1] + s[i];
  }
  let cntR = Math.max(...subStrA.map((s) => s.length));
  // 基于每个位置的子串长度搭建新数组并计算最大值
  return Math.max(cntN, cntR);
};

// 根据重复位置调整最长子串
function lengthOfLongestSubstring(s: string): number {
  let subStrA = s.split('');
  for(let i = 1;i<s.length;i++){
    const iPos = subStrA[i-1].indexOf(s[i]);
    // 如果当前字符没有出现在前一个的最长无重复子串，则直接加
    if(iPos < 0) subStrA[i] = subStrA[i-1] + s[i];
    // 否则从重复位置后截取再加上自己，保存最大可能的最长子串
    else subStrA[i] = subStrA[i-1].slice(iPos+1) + s[i];
  }
  // 如果为空，计算出是无穷小-infinity，需要判断下和0的关系
  return Math.max(0, Math.max(...subStrA.map((s) => s.length)));
};