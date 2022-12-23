// https://leetcode.cn/problems/final-value-of-variable-after-performing-operations/
// 统计加减操作数量来看结果
function finalValueAfterOperations(operations: string[]): number {
  // 直接统计op中第二个字符是+还是-，+就加1，-就-1，返回统计值
  const n = operations.length;
  let plus = operations.filter(str => str[1] == '+').length; // 得到+操作的数量
  return plus - (n - plus); // 加的数量减去减的数量
};