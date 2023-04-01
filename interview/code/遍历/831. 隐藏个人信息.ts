// https://leetcode.cn/problems/masking-personal-information/
// 分情况快速处理
const country = ["", "+*-", "+**-", "+***-"];
function maskPII(s: string): string {
  // 只有邮箱有@，所以直接处理at找邮箱
  const at = s.indexOf("@");
  if (at > 0) {
    // 邮箱直接基于第一个和@前一个找到前后字符然后打码
    s = s.toLowerCase();
    return (s[0] + "*****" + s.substring(at - 1)).toLowerCase();
  }
  // 处理数字形式的电话号码
  let sb = "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    // 只处理数字，因为最后需要后四位
    if ('0'.charCodeAt(0) <= c && c <= '9'.charCodeAt(0)) {
      sb += String.fromCharCode(c);
    }
  }
  s = sb.toString();
  // 这里国家编号根据超出的范围选择前面的显示形式，非常便捷的处理
  return country[s.length - 10] + "***-***-" + s.substring(s.length - 4);
};
