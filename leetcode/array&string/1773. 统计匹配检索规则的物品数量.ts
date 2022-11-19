// https://leetcode.cn/problems/count-items-matching-a-rule/
// 枚举+filter优雅实现
function countMatches(items: string[][], ruleKey: string, ruleValue: string): number {
  enum msg { type, color, name }; // 枚举匹配内容
  return items.filter((item) => item[msg[ruleKey]] == ruleValue).length; // filter筛选
};