// https://leetcode.cn/problems/to-lower-case/
// 单纯基于字符编码进行判断和转化
function toLowerCase(s: string): string {
  // 或者直接调用函数
  // return s.toLowerCase()
  let s_lower: string = "";
  // 记录转大小写编码差的大小
  let inter: number = "a".charCodeAt(0) - "A".charCodeAt(0);
  // 记录大写字符编码范围
  let up_start: number = "A".charCodeAt(0);
  let up_end: number = "Z".charCodeAt(0);
  for (let s_i of s) {
    let s_i_code = s_i.charCodeAt(0);
    // 仅对大写字符进行转化
    if (s_i_code >= up_start && s_i_code <= up_end) {
      // 这里其实可以用位运算｜替代加法，更快
      // 因为这里正好不会冲突，相当于加了起来，即32对应的地方都是0
      s_i = String.fromCharCode(s_i_code + inter)
    }
    s_lower += s_i;
  }
  return s_lower
};