// https://leetcode.cn/problems/max-area-of-island/
// 首先dfs找到岛，然后对摧毁的面积进行记录和统计，返回最大值即可
function maxAreaOfIsland(grid: number[][]): number {
  const n = grid.length, m = grid[0].length;
  function destroyIsland(x: number, y: number): number {
    // 边界或0则退出
    if (x < 0 || x >= n || y < 0 || y >= m || grid[x][y] === 0) return 0;
    // 否则进行剩余岛屿的摧毁
    return 1 + destroyIsland(x - 1, y) + destroyIsland(x + 1, y) + destroyIsland(x, y - 1), destroyIsland(x, y + 1);
  }
  let maxArea = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        // 记录最大值
        maxArea = Math.max(destroyIsland(i, j), maxArea);
      }
    }
  }
  return maxArea;
};
