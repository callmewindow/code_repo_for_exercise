// https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/
// 排序后取出最小的k个数
function getLeastNumbers(arr: number[], k: number): number[] {
  return arr.sort((b, f) => b - f).slice(0, k); // 排序后取出最小的k个数
  // 正常解法应该是维护一个长度k的数组，存储当前遍历范围中最小的k个数，遍历一遍后得到正确解
};

