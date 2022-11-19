// https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
// dfs一步步走，超出范围则停下
let row: number, col: number;
function dfsCnt(grid: number[][], r: number, c: number, k: number): number {
  // 判断是否超出边界和是否已经访问过
  if (r >= row || r < 0 || c >= col || c < 0 || grid[r][c] == 1) return 0;

  grid[r][c] = 1;
  // 先变字符串然后变数组，然后reduce计算，但是注意不能直接reduce，直接处理得到的f和b都是强行转化为数字的结果
  let rCnt = String(r).split('').map((ch) => Number(ch)).reduce((f, b) => f + b);
  let cCnt = String(c).split('').map((ch) => Number(ch)).reduce((f, b) => f + b);
  // 因为是统计，所以不用恢复grid，走过的不能再走
  // console.log(r,rCnt,c,cCnt);
  // 基于r和c判断该地方能否被访问，不能访问则不继续前进，返回0
  if (rCnt + cCnt > k) return 0;
  // 能访问则+1并加上前进的结果
  let res = 1;
  // 因为从0，0出发，因此只需不断向上向右即可
  res += dfsCnt(grid, r + 1, c, k) + dfsCnt(grid, r, c + 1, k);
  return res;
}

function movingCount(m: number, n: number, k: number): number {
  // 声明数组和行列
  let grid = Array(m).fill(0)
    .map((g) => Array(n).fill(0));
  row = m, col = n;
  // 找能到达的，肯定从0,0开始，因此直接调用即可
  let res = dfsCnt(grid, 0, 0, k);
  return res;
};