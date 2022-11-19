// https://leetcode.cn/problems/zero-matrix-lcci/
// 利用数组保存状态，空间节省时间
function setZeroes(matrix: number[][]): void {
  // 因为只要一行有一个0，这一行都是0，所以如果朴素的遍历然后按顺序处理一行一列
  // 会导致无法正常判断列，同时如果在读取到0后立刻处理，其实是n3复杂度
  // 因此需要先记录下每行每列的情况再一次二层遍历处理
  let row = matrix.length;
  if (row == 0) return;
  let col = matrix[0].length;
  // 如果三层循环，判断可以简化为一个布尔变量
  let rowTo0 = Array(row).fill(false);
  let colTo0 = Array(col).fill(false);
  for (let x = 0; x < row; x++)
    for (let y = 0; y < col; y++)
      if (matrix[x][y] == 0)
        rowTo0[x] = colTo0[y] = true;
  // console.log(rowTo0, colTo0);
  for (let x = 0; x < row; x++)
    for (let y = 0; y < col; y++)
      if (rowTo0[x] || colTo0[y]) // 当行或列上有0便转0
        matrix[x][y] = 0;
  return;
};

// 将对行的处理简化
function setZeroes_1(matrix: number[][]): void {
  let row = matrix.length;
  if (row == 0) return;
  let col = matrix[0].length;
  let rowTo0 = Array(row).fill(false);
  let colTo0 = Array(col).fill(false);
  for (let x = 0; x < row; x++)
    for (let y = 0; y < col; y++)
      if (matrix[x][y] == 0) rowTo0[x] = colTo0[y] = true;
  // console.log(rowTo0, colTo0);
  // 行0则直接替换，否则依次处理列
  for (let x = 0; x < row; x++) {
    if (rowTo0[x]) matrix[x] = Array(col).fill(0);
    else for (let y = 0; y < col; y++) if (colTo0[y]) matrix[x][y] = 0;
  }
  return;
};

// 使用矩阵自己记录行列情况
function setZeroes_2(matrix: number[][]): void {
  let row = matrix.length;
  if (row == 0) return;
  let col = matrix[0].length;
  // 先使用每行开头，每列结尾记录是否清零，为防止开头行或开头列被误判，使用参数特殊保存
  let row0 = false, col0 = false;
  for (let x = 0; x < row; x++)
    for (let y = 0; y < col; y++)
      if (!matrix[x][y]) {
        matrix[x][0] = matrix[0][y] = 0;
        if (x == 0) row0 = true;
        if (y == 0) col0 = true;
      }
  // console.log(matrix);
  // 为防止互相影响倒序处理矩阵，对第0行特判
  for (let x = row - 1; x >= 0; x--) {
    if ((x != 0 && matrix[x][0] == 0) || (x == 0 && row0)) matrix[x] = Array(col).fill(0);
    else for (let y = col - 1; y >= 0; y--) if ((y != 0 && matrix[0][y] == 0) || (y == 0 && col0)) matrix[x][y] = 0;
  }
  return;
};