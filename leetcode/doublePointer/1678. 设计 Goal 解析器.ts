// https://leetcode.cn/problems/goal-parser-interpretation/
// 直接使用编译器思维判断文法
var cmd_check: string;
var cmd_i: number;
function checkAL(): string {
  // 判断下一个字符
  if (cmd_check[++cmd_i] == ')') {
    return 'o';
  } else {
    // 如果是(al)则跳到)再返回
    cmd_i += 2;
    return 'al';
  }
}
function interpret(command: string): string {
  cmd_check = command;
  let cmd_l = cmd_check.length;
  let cmd_done: string = '';
  for (cmd_i = 0; cmd_i < cmd_l; cmd_i++) {
    // 编译器思维
    if (cmd_check[cmd_i] == '(') {
      cmd_done += checkAL();
    } else {
      cmd_done += 'G';
    }
  }
  return cmd_done;
};