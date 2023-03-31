// https://leetcode.cn/problems/rotate-image/
// 找规律原地替换数字
/**
 Do not return anything, modify matrix in-place instead.
 */
 function rotate(matrix: number[][]): void {
  const n = matrix.length;
  // 一次转四个点，所以只需要访问四分之一的值即可
  for (let i = 0; i < Math.floor(n / 2); ++i) {
    // 如果是奇数，需要旋转前半包括中间轴，才能遍历所有内容
    for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
      // 因为这里是旋转，不是反转，所以不能直接交换
      const temp = matrix[i][j];
      // 左上角
      matrix[i][j] = matrix[n - j - 1][i];
      // 右上角
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      // 右下角
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      // 左下角
      matrix[j][n - i - 1] = temp;
    }
  }
};
