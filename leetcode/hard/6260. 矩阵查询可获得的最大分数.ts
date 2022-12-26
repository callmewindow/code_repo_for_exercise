// https://leetcode.cn/problems/maximum-number-of-points-from-grid-queries/
// dfs寻找，果然不太行
function dfs(grid: number[][], vis: number[][], row: number, col: number, flag: number): number {
  // console.log(row, col);
  let res = 0;
  // 如果已经访问或者超出边界则返回0
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return res;
  if (vis[row][col]) return res;

  // 否则标记访问过
  vis[row][col] = 1;
  if (grid[row][col] < flag) res++; // 小于数则加一分
  else return res;// 如果大于则不能走

  // 寻找其他数
  res += dfs(grid, vis, row + 1, col, flag);
  res += dfs(grid, vis, row, col + 1, flag);
  res += dfs(grid, vis, row - 1, col, flag);
  res += dfs(grid, vis, row, col - 1, flag);

  // console.log(res);

  return res;
}
function maxPoints(grid: number[][], queries: number[]): number[] {
  const m = grid.length, n = grid[0].length;
  const q = queries.length;
  let answer = Array(q).fill(0);
  for (let i = 0; i < q; i++) {
    let vis = Array(m).fill(0).map(() => Array(n).fill(0)); // 0表示没访问，为方便使用备份一个
    // console.log(vis);
    answer[i] = dfs(grid, vis, 0, 0, queries[i]);
  }
  return answer;
};

// 使用i记录是否第一次访问，快了一点
function dfs_1(grid: number[][], vis: number[][], row: number, col: number, flag: number, visFlag: number): number {
  // console.log(row, col);
  let res = 0;
  // 如果已经访问或者超出边界则返回0
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return res;
  if (vis[row][col] == visFlag) return res;

  // 否则标记访问过
  vis[row][col] = visFlag;
  if (grid[row][col] < flag) res++; // 小于数则加一分
  else return res;// 如果大于则不能走

  // 寻找其他数
  res += dfs_1(grid, vis, row + 1, col, flag, visFlag);
  res += dfs_1(grid, vis, row, col + 1, flag, visFlag);
  res += dfs_1(grid, vis, row - 1, col, flag, visFlag);
  res += dfs_1(grid, vis, row, col - 1, flag, visFlag);

  // console.log(res);

  return res;
}
function maxPoints_1(grid: number[][], queries: number[]): number[] {
  const m = grid.length, n = grid[0].length;
  let vis = Array(m).fill(0).map(() => Array(n).fill(-1)); // 访问情况数组
  const q = queries.length;
  let answer = Array(q).fill(0);
  for (let i = 0; i < q; i++) {
    answer[i] = dfs_1(grid, vis, 0, 0, queries[i], i); // 用i来标记是这次的第一次访问
  }
  return answer;
};