// https://leetcode.cn/problems/generate-parentheses/
// 手动将括号数量拆成两部分，然后随意拼接即可
function generateParenthesis(n: number): string[] {
  if (n === 0) return [""]; // 防止后续直接退出
  if (n === 1) return ["()"];
  // 递归，即尝试将n-1个括号的情况分别放在()的左中右位置
  // 进行去重处理，为了便于去重，利用set记录
  // const res:string[] = [];
  const res: Set<string> = new Set();
  // const res1: Set<string> = new Set();
  // const res2: Set<string> = new Set();
  // 这样无法遍历所有情况，例如前后分别有一部分的情况
  for (let i = 0; i <= n - 1; i++) {
    // 分成两部分进行处理
    const left = generateParenthesis(i);
    const right = generateParenthesis(n - 1 - i);
    for (let strL of left) {
      for (let strR of right) {
        // 但也不能太随意，如果采用方法2，会导致()中有内容的情况被忽视，从而无法全部涉及
        // res.add("(" + strL + ")" + strR);
        // res1.add(strL + "()" + strR);
        res.add(strL + "(" + strR + ")");
      }
    }
  }
  // 这种方案也无法处理所有情况，只是在单方面拼接，例如前后有一部分的情况就会被忽视
  // let find = generateParenthesis(n - 1);
  // for (let str of find) {
  //   res.add(str + "()");
  //   res.add("(" + str + ")");
  //   res.add("()" + str);
  // }
  // 将res转为数组返回
  // console.log('0',Array.from(res.values()));
  // console.log('1',Array.from(res1.values()));
  // console.log('2',Array.from(res2.values()));
  return Array.from(res.values());
};