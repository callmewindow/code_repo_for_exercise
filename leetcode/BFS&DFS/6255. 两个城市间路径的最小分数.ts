// https://leetcode.cn/problems/minimum-score-of-a-path-between-two-cities/
// shift操作很花时间，在极限操作下最好不要使用
function minScore(n: number, roads: number[][]): number {
  // 找到1到n之间的所有路径，找出路径中的最小距离
  // 因为一条路径可以走多次，所以只要是1能到达的位置都可以多次走

  // 所以问题就变成了寻找1能到达的最短距离，又1能到n，所以找n能到的即可
  // 因为n一定出现在road的第二个值，不好判断，因为边是双向的，所以判断需要两次
  const graph = Array.from({ length: n + 1 }, () => new Map());
  for (let [cur, next, w] of roads) {
    graph[cur].set(next, w);
    graph[next].set(cur, w);
  }

  let minDis = 10001;
  let cityVisit = Array(n + 1).fill(0);
  cityVisit[1] = 1, cityVisit[n] = 1;
  let city = [1];
  while (city.length > 0) {
    for (let _ of new Array(city.length)) {
      const cur = city.shift() || -1;
      for (let [next, w] of graph[cur]) {
        minDis = minDis < w ? minDis : w;
        if (cityVisit[next] == 0) city.push(next);
        cityVisit[next] = 1;
      }
    }
  }
  return minDis;
};

// 对于多次使用的数据，如果可能出现很多无用的数据，应该想办法剔除
// 对于数据，只需每次查需要的点即可，因此一定要建图
function minScore_1(n: number, roads: number[][]): number {
  // 找到1到n之间的所有路径，找出路径中的最小距离
  // 因为一条路径可以走多次，所以只要是1能到达的位置都可以多次走

  // 所以问题就变成了寻找1能到达的最短距离，又1能到n，所以找n能到的即可
  // 因为n一定出现在road的第二个值，不好判断，因为边是双向的，所以判断需要两次
  let minDis = 10001;
  let city = [n];
  let cityVisit = Array(n + 1).fill(0);
  cityVisit[n] = 1;
  while (city.length > 0) {
    const cur = city.shift(); // 优先取第一个
    for (let i = 0; i < roads.length; i++) {
      // 遍历所有当前节点能到达的边就返回
      if (roads[i][0] == cur || roads[i][1] == cur) {
        const next = roads[i][0] == cur ? roads[i][1] : roads[i][0];
        minDis = minDis > roads[i][2] ? roads[i][2] : minDis;
        roads.splice(i, 1); // 剔除当前边，减少后续遍历
        i--;
        if (cityVisit[next] == 0) {
          city.push(next); // 没遍历过才去寻找
          cityVisit[next] = 1;
        }
      }
    }
  }
  return minDis;
};

// 用map建图便于访问，BFS每次用临时数组记录下一波要处理的城市
function minScore_2(n: number, roads: number[][]): number {
  const graph = Array.from({ length: n + 1 }, () => new Map());
  for (let [cur, next, w] of roads) {
    graph[cur].set(next, w);
    graph[next].set(cur, w);
  }

  let minDis = Infinity; // 极大值
  let vis = Array(n + 1).fill(0);
  vis[1] = 1, vis[n] = 1; // 判断已经访问过
  let city = [1]; // 每次处理的城市数组
  while (city.length > 0) {
    let tmp: number[] = [];
    // 如果每次shift或pop，由于数据过大会超时
    for (let cur of city) {
      for (let [next, w] of graph[cur]) {
        minDis = minDis < w ? minDis : w;
        // graph[next].delete(cur); // 一条边访问一次，但删除费时，所以直接处理
        if (vis[next] == 0) {
          vis[next] = 1;
          tmp.push(next);
        }
      }
    }
    city = tmp;
  }
  return minDis;
};

// dfs递归进行距离的检查，调用函数较慢
function dfs(cur: number, graph: number[][][], vis: Map<number, boolean>): number {
  let ans = Infinity;
  if (vis.has(cur)) return Infinity; // 已经访问过就返回最大值
  vis.set(cur, true);
  for (let [next, dis] of graph[cur]) {
    ans = ans < dis ? ans : dis;
    let tmp = dfs(next, graph, vis);
    ans = ans < tmp ? ans : tmp;
  }
  return ans;
}

function minScore_3(n: number, roads: number[][]): number {
  const graph: number[][][] = []
  for (const [a, b, dis] of roads) {
    graph[a] = graph[a] || []
    graph[a].push([b, dis])
    graph[b] = graph[b] || []
    graph[b].push([a, dis])
  }

  let vis = new Map();
  // vis.set(1, true), vis.set(n, true); // 判断已经访问过

  return dfs(1, graph, vis);
};

// 用set记录有没有访问过
function minScore_4(n: number, roads: number[][]): number {
  const graph = Array.from({ length: n + 1 }, () => new Map());
  for (let [cur, next, dis] of roads) {
    graph[cur].set(next, dis);
    graph[next].set(cur, dis);
  }

  let minDis = Infinity; // 极大值
  let vis = new Set([1, n]);
  let city = [1]; // 每次处理的城市数组
  while (city.length > 0) {
    let tmp: number[] = [];
    // 如果每次shift或pop，由于数据过大会超时
    for (let cur of city) {
      for (let [next, dis] of graph[cur]) {
        minDis = minDis < dis ? minDis : dis;
        if (!vis.has(next)) {
          vis.add(next);
          tmp.push(next);
        }
      }
    }
    city = tmp;
  }
  return minDis;
};