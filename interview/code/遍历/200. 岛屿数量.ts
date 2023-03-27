// https://leetcode.cn/problems/number-of-islands/
// 遍历寻找岛屿，找到就摧毁！
function numIslands(grid: string[][]): number {
  // 不要想的太困难，只需要在遇到1时开始dfs
  // 对dfs到的都变0，防止重复统计，知道找不到1了，则说明寻找结束了一个岛屿
  // 此时再从头开始找，看有没有1，如果有，就从当前开始继续dfs去除1

  // 知道找不到1说明结束
  let cnt = 0;
  const x = grid.length, y = grid[0].length;
  // 遍历寻找
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] === '1') {
        // 找到了一个岛就计数并尝试摧毁
        cnt++;
        destroyIsland(grid, i, j);
      }
    }
  }
  return cnt;
};

function destroyIsland(grid: string[][], i: number, j: number): void {
  // 从ij坐标开始摧毁岛屿
  const x = grid.length, y = grid[0].length;
  // 到边界退出
  if (i >= x || i < 0 || j >= y || j < 0) return;
  if (grid[i][j] === '0') return; // 不是岛屿不摧毁
  // 摧毁当前岛，并尝试摧毁下方和右方
  grid[i][j] = '0';
  // 岛屿有可能是拐弯的，只看右和下可能会错过左和上的
  destroyIsland(grid, i + 1, j);
  destroyIsland(grid, i - 1, j);
  destroyIsland(grid, i, j + 1);
  destroyIsland(grid, i, j - 1);
}