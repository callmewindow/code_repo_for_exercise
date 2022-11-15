// https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/\
// dps回溯寻找所有可能
let row_1: number, col_1: number;
const mv = [[-1, 0], [1, 0], [0, -1], [0, 1]] // 上、下、左、右
// 这里的bd是引用，所以不会产生额外的时间和内存
function dfsWord(bd: string[][], r: number, c: number, word: string, k: number): boolean {
  // 判断超出边界的情况，k为已经判断了的
  if (r >= row_1 || r < 0 || c >= col_1 || c < 0 || bd[r][c] != word[k]) return false;
  // 没返回就说明等于对应的字符，长度够了就是true
  if (k == word.length - 1) return true;
  // 为了防止当前位置在被读到，替换掉当前的字符
  bd[r][c] = '0';
  let find = dfsWord(bd, r + 1, c, word, k + 1) || dfsWord(bd, r - 1, c, word, k + 1) ||
    dfsWord(bd, r, c + 1, word, k + 1) || dfsWord(bd, r, c - 1, word, k + 1);
  // 如果寻找失败了注意恢复回来
  bd[r][c] = word[k];
  return find;
}
function exist(board: string[][], word: string): boolean {
  // 直接硬做，设定边界开始遍历
  row_1 = board.length, col_1 = board[0].length;
  for (let r = 0; r < row_1; r++) {
    for (let c = 0; c < col_1; c++) {
      // 提前做起点的判断，函数中不再需要判断
      if (board[r][c] == word[0]) {
        if (dfsWord(board, r, c, word, 0)) return true;
      }
    }
  }
  return false;
};