// https://leetcode.cn/problems/li-wu-de-zui-da-jie-zhi-lcof
// 直接在grid上遍历处理，n2复杂度
function maxValue(grid: number[][]): number {
  // 每次向右或向下，即可能来自上或者左
  let row = grid.length, col = grid[0].length;
  // 因为价值大于0所以可以直接遍历
  for (let x = 0; x < row; x++) {
    // 记录上和左的最大值
    let t = 0, l = 0;
    for (let y = 0; y < col; y++) {
      // 这里其实不会对grid多次遍历，因此直接在grid上操作即可
      // 这里判断x-1，因为如果x-1可能不存在，此时尝试y会报错
      t = grid[x - 1] ? grid[x - 1][y] : 0;
      l = grid[x][y - 1] ? grid[x][y - 1] : 0;
      grid[x][y] = grid[x][y] + Math.max(t, l);
      // console.log(grid)
    }
  }
  return grid[row - 1][col - 1];
};