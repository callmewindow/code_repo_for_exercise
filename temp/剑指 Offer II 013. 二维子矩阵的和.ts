// https://leetcode.cn/problems/O4NDxx/
class NumMatrix {
  constructor(matrix: number[][]) {
    // 构建的时候直接记录总和，用sum矩阵记录下ij脚标之前的所有值之和

  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    // 基于右下角获取右下角左上的sum
    // 基于左上角获取左上角左上的sum
    // 基于右上角和左下角取左侧和上侧的sum

    // 右下 - 右上 - 左下 + 左上（左上会被减两次需要加上）
  }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */