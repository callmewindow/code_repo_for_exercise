// https://leetcode.cn/problems/rotate-matrix-lcci/
// 找出规律，先转置再反转
function rotate(matrix: number[][]): void {
  // 直接在上面操作，90度旋转，其实就是先转置然后每一行反转
  let row = matrix.length;
  if (row == 0) return;
  let col = matrix[0].length;
  // 其实这个题目n*n，row==col
  for (let x = 0; x < row; x++) {
    // 先转置，因为同一个位置转一次就行，所以y从x开始
    for (let y = x; y < col; y++) {
      const tmp = matrix[x][y];
      matrix[x][y] = matrix[y][x];
      matrix[y][x] = tmp;
    }
    // console.log(matrix)
    // 一行结束了反转这一行的前后
    matrix[x] = matrix[x].reverse()
  }
  return;
};