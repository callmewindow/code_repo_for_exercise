// https://leetcode.cn/problems/fan-zhuan-dan-ci-shun-xu-lcof/
// replace处理特殊情况，然后利用split和join快速转化
function reverseWords(s: string): string {
  // 直接基于空格拆分，然后调整反转数组拼接
  // replace不会改变原本的s，前一个参数也可以放置正常的字符，此时只会替换题一个匹配的
  // 第一个参数还可防止通配符，即//g中可放正则表达式，^为开头,$为结尾，|表示或，&为同时符合
  s = s.replace(/^\s*|\s*$/g, "");
  // 将一个以上的空格替换为一个空格
  s = s.replace(/\s\s*/g, " ");
  // console.log(s);
  // trim会移除字符串开始和末尾处的所有换行符，空格(包括连续的空格)和制表符
  // 如果这些空白字符在字符串中间时，它们将被保留，不会被移除
  // let s1 = s.trim();
  // console.log(s1);
  return s.split(' ').reverse().join(' ');
};