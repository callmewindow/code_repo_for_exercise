// https://leetcode.cn/problems/merge-intervals/
// 避免心急，一步步处理才能更好的应对多次合并的情况
function merge(intervals: number[][]): number[][] {
  // 先按第一个元素排序
  intervals.sort((a, b) => a[0] - b[0])
  // 暂时不考虑第二个

  // 记录合并
  let res: number[][] = [];
  // 和前一个比较，可以减少一些条件判断
  for (let i = 1; i < intervals.length; i++) {
    // 对于 [1,3] 和 [2,6], 比较 3 和 2, 3 >= 2 则合并
    // 可以合并则直接修改当前区间，确保合并后的区间在i的位置
    if (intervals[i][0] <= intervals[i - 1][1])
      intervals[i] = [intervals[i - 1][0], Math.max(intervals[i - 1][1], intervals[i][1])]
    else
      // 不能合并则将上一个合并结果加入，此时顺利完成一次合并
      res.push(intervals[i - 1])
  }
  // 最后一次的结果需要额外放入
  res.push(intervals[intervals.length - 1])
  return res
};