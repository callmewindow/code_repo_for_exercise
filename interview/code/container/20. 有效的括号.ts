// https://leetcode.cn/problems/valid-parentheses/
// 直接判断括号实现处理
function isValid(s: string): boolean {
  // 不利用模式串了，直接基于匹配情况来处理
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const strItem = s[i];
    // 左括号入栈等待最近匹配
    if (strItem === '(' || strItem === '{' || strItem === '[') {
      stack.push(strItem);
    } else {
      // 否则判断是否是能匹配的
      const stackEnd = stack[stack.length - 1];
      if ((stackEnd === '(' && strItem === ')') ||
        (stackEnd === '{' && strItem === '}') ||
        (stackEnd === '[' && strItem === ']')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};