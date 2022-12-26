// https://leetcode.cn/problems/delete-greatest-value-in-each-row/
// 直接模拟
function deleteGreatestValue(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  let del = Array(m).fill(0).map(() => Array(n).fill(0)); // 1表示被删除了
  let cnt = 0; // 记录删除次数，一共删除n次
  let res = 0;
  while (++cnt <= n) {
    // 记录每一行最大值的最大值
    let maxRow = -1;
    for (let i = 0; i < m; i++) {
      let maxCol = -1; // 记录每一行的最大值
      let maxPos: number[] = []; // 记录最大值坐标
      for (let j = 0; j < n; j++) {
        if (del[i][j]) continue;
        if (grid[i][j] > maxCol) {
          maxCol = grid[i][j];
          maxPos = [i, j];
        }
      }
      // 删除每一行的最大值
      del[maxPos[0]][maxPos[1]] = 1;
      if (maxCol > maxRow) maxRow = maxCol;
      // console.log(del);
    }
    res += maxRow;
  }
  return res;
};

// 直接排序处理，直接每列查询最大值，会更快
function deleteGreatestValue_1(grid: number[][]): number {
  // grid每行排序
  const m = grid.length;
  for (let i = 0; i < m; i++) grid[i].sort((b, f) => b - f);
  const n = grid[0].length;
  // 每列找出最大值记录并返回
  // 因为此时每列都是某一次删除需要一起删除的最大值
  let res = 0, tmp = -1;
  for (let i = 0; i < n; i++) {
    tmp = -1;
    for (let j = 0; j < m; j++) {
      if (tmp < grid[j][i]) tmp = grid[j][i];
    }
    res += tmp;
  }
  return res;
};
