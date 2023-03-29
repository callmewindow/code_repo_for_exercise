// https://leetcode.cn/problems/string-without-aaa-or-bbb/
// 贪心写数量多的
function strWithout3a3b(a: number, b: number): string {
  // 直接贪心即可，为了确保a和b交叉，需要尽可能让后续a和b的数量相同
  // 即尽可能只写多的，只有当末尾重复才写少的
  let ans = ''
  while (a > 0 || b > 0) {
    let writeA = true;
    const ansLen = ans.length;
    if (ansLen >= 2 && ans[ansLen - 1] === ans[ansLen - 2]) {
      // 末尾相同需要写另一个字符
      writeA = ans[ansLen - 1] === 'b';
    }
    else {
      // 末尾不同则直接写大的数
      writeA = a >= b;
    }

    if (writeA) {
      a -= 1
      ans += 'a';
    } else {
      b -= 1
      ans += 'b';
    }
  }
  return ans;
};