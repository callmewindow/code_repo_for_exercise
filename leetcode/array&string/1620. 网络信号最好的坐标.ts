// https://leetcode.cn/problems/coordinate-with-maximum-network-quality/
// 理论上的标答，有一些可优化的地方，比如平方根没必要，数量较少，没必要记录最小xy等等
// 计算欧氏距离
function getEucliDis(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}
// 计算当前坐标信号强度
function getPower(x: number, y: number, ts: number[][], r: number): number {
  // 当前点的强度
  let pointP = 0;
  let pointDis: number;
  for (let t of ts) {
    // 距离超过半径则跳过
    pointDis = getEucliDis(x, y, t[0], t[1])
    if (pointDis > r) continue;
    // 否则增加信号强度
    pointP += Math.floor(t[2] / (1 + pointDis))
  }
  return pointP;
}
function bestCoordinate(towers: number[][], radius: number): number[] {
  // 记录最大坐标所在的区域边界
  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  for (let tower of towers) {
    minX = tower[0] < minX ? tower[0] : minX;
    maxX = tower[0] > maxX ? tower[0] : maxX;
    minY = tower[1] < minY ? tower[1] : minY;
    maxY = tower[1] > maxY ? tower[1] : maxY;
  }
  // console.log(minX,maxX,minY,maxY);
  // 记录最大信号的坐标
  let maxPX: number, maxPY: number;
  let maxP = Number.MIN_SAFE_INTEGER;
  let pointP: number;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      pointP = getPower(x, y, towers, radius);
      if (pointP > maxP) {
        maxP = pointP;
        maxPX = x;
        maxPY = y;
      } else {
        if (pointP == maxP) {
          // 判断字典序
          if ((x < maxPX) || (x == maxPX && y < maxPY)) {
            maxPX = x;
            maxPY = y;
          }
        }
      }
    }
  }
  return maxP > 0 ? [maxPX, maxPY] : [0, 0]
};