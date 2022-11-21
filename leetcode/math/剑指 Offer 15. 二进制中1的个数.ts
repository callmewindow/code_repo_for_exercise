// https://leetcode.cn/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/
// 位运算实现快速处理，注意无符号的处理
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  // console.log(n);
  let cnt = 0;
  // 通过无符号右移可将n变为无符号整数
  // let n2 = n >>> 0;
  // console.log(n2); // 这样后面就可以只判断>0
  // 这里判断是否为0可以同时处理正和负的情况
  while (n != 0) {
    // 通过&每次去除一个末尾的1
    n &= n - 1;
    ++cnt;
    // console.log(n);
  }
  return cnt;
};