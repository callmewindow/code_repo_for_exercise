// https://leetcode.cn/problems/tvdfij/
function pivotIndex(nums: number[]): number {
  // 方法1：遍历找中点（从最左开始，找到退出），然后判断两侧的值（总和），但是一个个加太慢
  // 优化1：记录总sum，然后基于中点后统计一侧的数量，然后另一侧是减去
  // 二次优化1：因为中点向右移动，所以不断用一个sum记录左侧的sum

  // 进而只需遍历一次就可以求解
  
};