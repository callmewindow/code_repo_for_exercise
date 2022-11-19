// https://leetcode.cn/problems/magical-string/
// 找规律不断拼接字符串然后判断个数
function magicalString(n: number): number {
  // 基于现有字符串进行延伸，同时统计1的格式，直到长度为n
  // 因为是连续出现的次数，所以1和2不能连续出现三次，最多两次
  // 反过来思考，s的字符其实就是1和2分别出现的次数，由此可得完整的s，将1和2替换为0和1

  // 基于前三位，不会影响当前的数
  let s = [0, 1, 1];
  // 统计0，即1的次数
  let cnt = 1;
  // 要添加的数字，2后面应该加1（0），所以这里是1
  let next = 1;
  for (let i = 2; i < n; i++) {
    // 切换0和1，注意要自己异或，因为每一位都代表的是连续的0或1
    next ^= 1;
    if (!s[i]) cnt++;
    // 如果2个则需要多push一个当前的值
    if (s[i]) s.push(next);
    s.push(next);
    // console.log(s.map((a)=>a+1).join(''));
  }
  return cnt;
};

// 修改成正常的1和2
function magicalString_1(n: number): number {
  let s = [1, 2, 2];
  let cnt = 1, next = 2;
  for (let i = 2; i < n; i++) {
    // 切换1和2
    next = next == 1 ? 2 : 1;
    if (s[i] == 1) cnt++;
    s.push(next);
    // 如果2个则需要多push一个
    if (s[i] == 2) s.push(next);
    // console.log(s.join(''));
  }
  return cnt;
};