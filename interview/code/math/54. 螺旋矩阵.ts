// https://leetcode.cn/problems/spiral-matrix/submissions/
// 设立多方向，根据边界进行调整
const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
function spiralOrder(matrix: number[][]): number[] {
  const x = matrix.length, y = matrix[0].length;
  // 螺旋，遇到边界右转即可，使用direction记录方向  
  let d = 0;
  let i = 0, j = 0;
  const res: number[] = [];
  while (true) {
    // 遇到边界或已经访问过的，尝试换方向
    if (i < 0 || i >= x || j < 0 || j >= y || matrix[i][j] === 666) {
      // 注意如果不满足首先需要回退一步，来到一个正常的位置，然后再调整
      [i, j] = [i - direction[d][0], j - direction[d][1]];
      d = (d + 1) % 4;
      // console.log(d, direction[d]);
      [i, j] = [i + direction[d][0], j + direction[d][1]];
      // console.log(i,j);
      // 如果此时仍然不符合条件，则说明遍历结束
      if (i < 0 || i >= x || j < 0 || j >= y || matrix[i][j] === 666) break;
    }
    // 已经符合条件则记录val，并更新，继续移动
    res.push(matrix[i][j]);
    matrix[i][j] = 666;
    [i, j] = [i + direction[d][0], j + direction[d][1]];
  }
  return res;
};