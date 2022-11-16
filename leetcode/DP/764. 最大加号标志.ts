// https://leetcode.cn/problems/largest-plus-sign
// 直接暴力，四方向dp分别保存上下左右1的数量，可跳过边界来处理
function orderOfLargestPlusSign(n: number, mines: number[][]): number {
  // 初始化一个n*n为1的数组，注意fill的其实是同一个数组，修改一个会修改所有
  // let grid = new Array(n).fill(new Array(n).fill(1));
  // 正常方法初始化
  let grid = new Array(n);
  for (let i = 0; i < n; i++) grid[i] = new Array(n).fill(1);
  // 将某些位置变为0
  for (let p of mines) grid[p[0]][p[1]] = 0;

  // 该矩阵记录上下左右可直接到达的1的数量，四个元素分别上下左右
  // let cntOne = grid.concat([]);
  // 二维数组没法直接一次concat深拷贝，也需要遍历，不如重新初始化
  let cntOne = new Array(n);
  // 复制过来再调整，默认都是0，边界值也处理完毕
  for (let x = 0; x < n; x++) {
    cntOne[x] = new Array(n);
    for (let y = 0; y < n; y++) cntOne[x][y] = new Array(4).fill(0);
  }

  // 跳过边界，因为边界的最大就是自己
  // 先来上左
  for (let x = 1; x < n - 1; x++) {
    for (let y = 1; y < n - 1; y++) {
      // 分别判断上左
      // 0的话不用管，1的话才需要新增
      if (grid[x][y - 1] == 1) cntOne[x][y][0] = cntOne[x][y - 1][0] + 1
      if (grid[x - 1][y] == 1) cntOne[x][y][2] = cntOne[x - 1][y][2] + 1
    }
  }
  // 再来下右
  for (let x = n - 2; x > 0; x--) {
    for (let y = n - 2; y > 0; y--) {
      if (grid[x][y + 1] == 1) cntOne[x][y][1] = cntOne[x][y + 1][1] + 1
      if (grid[x + 1][y] == 1) cntOne[x][y][3] = cntOne[x + 1][y][3] + 1
    }
  }
  // console.log(cntOne);

  // 遍历找最大值
  let maxK = 0;
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      // 如果自己是0则跳过
      if (grid[x][y] == 0) continue;
      // 是1，则找最短的边加上自己
      // console.log(cntOne[x][y], Math.min(...cntOne[x][y]))
      const nowk = 1 + Math.min(...cntOne[x][y]);
      if (nowk > maxK) maxK = nowk;
    }
  }
  return maxK;
};

// 简化调整代码，发现内存过大的问题
function orderOfLargestPlusSign_1(n: number, mines: number[][]): number {
  // 初始化grid
  let grid = new Array(n);
  for (let i = 0; i < n; i++) grid[i] = new Array(n).fill(1);
  for (let p of mines) grid[p[0]][p[1]] = 0;
  // 初始化1数量dp矩阵，四个数按顺序是上下左右能连续访问的1的数量
  let cntOne = new Array(n);
  for (let x = 0; x < n; x++) {
    cntOne[x] = new Array(n);
    for (let y = 0; y < n; y++) cntOne[x][y] = new Array(4).fill(0);
  }

  // 计算均可跳过边界，因为此处的k只能等于自己
  // 先从左上角开始计算上左，0可跳过，因为此时xy无法连续访问1
  for (let x = 1; x < n - 1; x++)
    for (let y = 1; y < n - 1; y++) {
      if (grid[x][y - 1] == 1) cntOne[x][y][0] = cntOne[x][y - 1][0] + 1
      if (grid[x - 1][y] == 1) cntOne[x][y][2] = cntOne[x - 1][y][2] + 1
    }
  // 再从右下角计算下右
  for (let x = n - 2; x > 0; x--)
    for (let y = n - 2; y > 0; y--) {
      if (grid[x][y + 1] == 1) cntOne[x][y][1] = cntOne[x][y + 1][1] + 1
      if (grid[x + 1][y] == 1) cntOne[x][y][3] = cntOne[x + 1][y][3] + 1
    }

  // 遍历找最大值
  let maxK = 0;
  for (let x = 0; x < n; x++)
    for (let y = 0; y < n; y++) {
      if (grid[x][y] == 0) continue;
      const nowK = 1 + Math.min(...cntOne[x][y]);
      if (nowK > maxK) maxK = nowK;
    }
  return maxK;
};

// 同时计算上下左右
function orderOfLargestPlusSign_2(n: number, mines: number[][]): number {
  // 初始化grid
  let grid = new Array(n);
  for (let i = 0; i < n; i++) grid[i] = new Array(n).fill(1);
  for (let p of mines) grid[p[0]][p[1]] = 0;
  // 初始化1数量dp矩阵，四个数按顺序是上下左右能连续访问的1的数量
  let cntOne = new Array(n);
  for (let x = 0; x < n; x++) {
    cntOne[x] = new Array(n);
    for (let y = 0; y < n; y++) cntOne[x][y] = new Array(4).fill(0);
  }
  // 计算跳过边界，同时处理上下左右
  for (let x = 1; x < n - 1; x++)
    for (let y = 1; y < n - 1; y++) {
      const rX = n - 1 - x, rY = n - 1 - y;
      if (grid[x][y - 1] == 1) cntOne[x][y][0] = cntOne[x][y - 1][0] + 1;
      if (grid[rX][rY + 1] == 1) cntOne[rX][rY][1] = cntOne[rX][rY + 1][1] + 1;
      if (grid[x - 1][y] == 1) cntOne[x][y][2] = cntOne[x - 1][y][2] + 1;
      if (grid[rX + 1][rY] == 1) cntOne[rX][rY][3] = cntOne[rX + 1][rY][3] + 1;
    }
  // 遍历找最大值
  let maxK = 0;
  for (let x = 0; x < n; x++)
    for (let y = 0; y < n; y++) {
      if (grid[x][y] == 0) continue;
      const nowK = 1 + Math.min(...cntOne[x][y]);
      if (nowK > maxK) maxK = nowK;
    }
  return maxK;
};

// 大佬解法，快速初始化，使用临时变量实现动态处理
function orderOfLargestPlusSign_3(n: number, mines: number[][]): number {
  // 初始化grid，使用grid本身来统计k，默认每一行为最大的k的可能，即n
  // 这里只有先fill了才能用map替换为其他的，new不是必须的
  let dp: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(n));
  // console.log(dp);
  for (const [i, j] of mines) dp[i][j] = 0;

  // 嵌套依次动态规划
  for (let i = 0; i < n; i++) {
    // 左、右、上、下
    let l = 0,
      r = 0,
      u = 0,
      d = 0;
    for (let j = 0; j < n; j++) {
      // 基于j生成逆转的角标，以同时处理四个方向
      const k = n - 1 - j;
      // 这里比较难理解，相当于是在不断的循环中完成了dp的搭建，非常nb
      l = dp[i][j] ? l + 1 : 0;
      dp[i][j] = Math.min(dp[i][j], l);
      u = dp[j][i] ? u + 1 : 0;
      dp[j][i] = Math.min(dp[j][i], u);
      r = dp[i][k] ? r + 1 : 0;
      dp[i][k] = Math.min(dp[i][k], r);
      d = dp[k][i] ? d + 1 : 0;
      dp[k][i] = Math.min(dp[k][i], d);
    }
    // console.log(dp);
  }
  // console.log(dp);
  // 基于dp每一行的最大值生成的新数组，寻找最大值，即整个数组的最大值
  return Math.max(...dp.map((row) => Math.max(...row)));
}