// https://leetcode.cn/problems/checking-existence-of-edge-length-limited-paths/
// 离线查询+并查集
function distanceLimitedPathsExist(n: number, edgeList: number[][], queries: number[][]): boolean[] {
  edgeList.sort((a, b) => a[2] - b[2]);
  const index = new Array(queries.length).fill(0);
  for (let i = 0; i < queries.length; i++) {
    index[i] = i;
  }
  index.sort((a, b) => queries[a][2] - queries[b][2]);

  const uf = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    uf[i] = i;
  }
  const res = new Array(queries.length).fill(0);
  let k = 0;
  for (let i of index) {
    while (k < edgeList.length && edgeList[k][2] < queries[i][2]) {
      merge(uf, edgeList[k][0], edgeList[k][1]);
      k++;
    }
    res[i] = find(uf, queries[i][0]) == find(uf, queries[i][1]);
  }
  return res;
};

function find(uf: number[], x: number): number {
  if (uf[x] === x) {
    return x;
  }
  // return uf[x] = find(uf, uf[x]); // 同时做赋值和返回
  uf[x] = find(uf, uf[x]);
  return uf[x];
};

function merge(uf: number[], x: number, y: number): void {
  x = find(uf, x);
  y = find(uf, y);
  uf[y] = x;
};