// https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/
// 记录移动方向，一步步移动On2解决
const move = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 移动方式
function spiralOrder(matrix: (number | undefined)[][]): (number | undefined)[] {
  // 记录是否已经遍历过，如果遇到边界或者已经遍历过则右转
  let row = 0, col = 0; // 默认从起点开始向右走
  let direct = 0; // 0右，1下，2左，3上

  let rowCnt = matrix.length;
  if (rowCnt == 0) return [];
  let colCnt = matrix[0].length;
  let matrixSpiral: (number | undefined)[] = [];
  while (true) {
    // 遇到边界或已访问过的则切换方向
    if (row >= rowCnt || row < 0 || col >= colCnt || col < 0 || matrix[row][col] == undefined) {
      row -= move[direct][0], col -= move[direct][1]; // 回到前一步
      direct = (direct + 1) % 4 // 确保3的时候变成0
      row += move[direct][0], col += move[direct][1];
      // 如果换向后还是边界或已访问，则说明遍历结束
      if (row >= rowCnt || row < 0 || col >= colCnt || col < 0 || matrix[row][col] == undefined) break;
    }
    matrixSpiral.push(matrix[row][col]);
    matrix[row][col] = undefined;// push后修改值，因为可能有-1的值，所以用undefined
    row += move[direct][0], col += move[direct][1]; // 继续前进
  }
  return matrixSpiral;
};