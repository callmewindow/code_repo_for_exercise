// https://leetcode.cn/problems/find-if-path-exists-in-graph/
// 记录各点访问，dfs，map比较花时间和内存
function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  // 用map建图
  let graph = new Map();
  for (let [u, v] of edges) {
    let uMap = graph.get(u), vMap = graph.get(v);
    if (!uMap) uMap = [], graph.set(u, uMap); // 不存在则新建
    if (!vMap) vMap = [], graph.set(v, vMap);
    uMap.push(v), vMap.push(u);
  }
  // console.log(graph);
  // 检查是否有0到n-1的路径
  let vis = Array(n); // 没访问是undefined
  return find(source, destination, vis, graph);
};
function find(start: number, end: number, vis: number[], graph: Map<number, number[]>): boolean {
  if (start == end) return true; // 已经到终点了就返回
  vis[start] = 1;
  const next = graph.get(start); // 有可能没有边
  if (next == [] || !next) return false;
  for (let n of next) {
    if (n == end) return true;
    if (!vis[n]) {
      // 没访问过则从n开始尝试
      if (find(n, end, vis, graph)) return true;
    }
    // 访问过则继续看
  }
  return false;
}