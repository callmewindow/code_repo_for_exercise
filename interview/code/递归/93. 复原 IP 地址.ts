// https://leetcode.cn/problems/restore-ip-addresses/
// 递归寻找第一个ip和剩余ip
function restoreIpAddresses(s: string): string[] {
  // 根据剩余字符串长度以及下一个字符串开头来判断能否如此拆分
  // 递归进行处理
  function findSomeIP(s: string, cnt: number): string[] {
    // cnt表示还需要多少个ip
    const n = s.length;
    const minLen = cnt * 1, maxLen = cnt * 3; // 判断长度上下限
    const res: string[] = [];
    // 如果长度不符合或cnt===0则肯定不行
    if (cnt === 0 || n < minLen || n > maxLen) return [];
    let ip1 = '';
    for (let i = 0; i < 3 && i < s.length; i++) {
      // 如果0的话直接退出
      ip1 += s[i];
      // 确保不超出范围
      if (i === 2 && Number(ip1) > 255) continue;
      // 如果只有1个ip需求，则不尝试寻找剩余的，而是当符合要求的时候只返回ip1
      if(cnt === 1 && i === s.length - 1) return [ip1];
      // 否则继续判断，需要筛选'0'的情况，注意+1
      const resIPs = findSomeIP(s.slice(i+1), cnt - 1);
      // console.log(ip1, resIPs);
      // 有满足的则直接push，否则执行下一步判断
      if (resIPs.length !== 0) res.push(...resIPs.map((ip) => ip1+'.'+ ip));
      // 如果是0则直接break
      if (ip1 === '0') break;
    }
    return res;
  }
  return findSomeIP(s, 4);
};