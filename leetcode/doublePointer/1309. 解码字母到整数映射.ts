// https://leetcode.cn/problems/decrypt-string-from-alphabet-to-integer-mapping/
// 编译器原理check1和2，不使用全局变量的方式进行
function checkOne(s: string, i: number): [string, number] {
  let ch_code: number;
  let ch: string;
  // 默认不偏移
  let shift: number = 0;
  // 判断是否有可能是#表示的字符，这里不判断长度也可以，会返回未定义，目前更规范
  if (i + 2 < s.length && s[i + 2] == '#') {
    // 只有是井号才说明是j-z，否则是单纯的ab
    ch_code = parseInt(s[i] + s[i + 1]) - 1 + 'a'.charCodeAt(0);
    ch = String.fromCharCode(ch_code);
    shift = 2;
  } else {
    ch = 'a';
  }
  return [ch, shift];
}
function checkTwo(s: string, i: number): [string, number] {
  let ch_code: number;
  let ch: string;
  let shift: number = 0;
  if (i + 2 < s.length && s[i + 2] == '#') {
    ch_code = parseInt(s[i] + s[i + 1]) - 1 + 'a'.charCodeAt(0);
    ch = String.fromCharCode(ch_code);
    shift = 2;
  } else {
    ch = 'b';
  }
  return [ch, shift];
}
function freqAlphabets(s: string): string {
  // string属于基础数据类型，只能深拷贝
  let s_l = s.length;
  // 保存函数返回值，注意初始化
  let r: [string, number] = ['', 0];
  // 数组保存便于处理
  let s_new: string[] = new Array();
  for (let i = 0; i < s_l; i++) {
    // 不可能是0，是0表示出错了
    if (s[i] == '1') {
      r = checkOne(s, i);
    } else {
      if (s[i] == '2') {
        r = checkTwo(s, i);
      } else {
        // 3～9
        let ch_code = parseInt(s[i]) - 1 + 'a'.charCodeAt(0);
        r[0] = String.fromCharCode(ch_code);
        r[1] = 0;
      }
    }
    s_new.push(r[0]);
    i += r[1];
  }
  return s_new.join('');
};