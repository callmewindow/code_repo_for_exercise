// https://leetcode.cn/problems/brick-wall/
// map记录每一条线的砖块情况
function leastBricks(wall: number[][]): number {
  const cnt = new Map();
  for (const widths of wall) {
    // 每一层有多少砖
    const n = widths.length;
    let sum = 0;
    for (let i = 0; i < n - 1; i++) {
      // 看当前这块砖的有边界是哪儿
      sum += widths[i];
      // 记录当前位置的无砖块情况
      cnt.set(sum, (cnt.get(sum) || 0) + 1);
    }
  }
  let maxCnt = 0;
  // 也可以直接获取value
  for (const [_, c] of cnt.entries()) {
    maxCnt = Math.max(maxCnt, c);
  }
  return wall.length - maxCnt;
};