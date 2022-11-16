// https://leetcode.cn/problems/domino-and-tromino-tiling
// 原始方法，针对不同情况拆分为四种情况，并对四种情况进行分别处理保存
function numTilings(n: number): number {
  const mod = 1e9 + 7;
  // 因为2*n，高度限制了比较好处理
  // 如果填充-块不会对区域产生太大影响，但如果L块，考虑到特殊形状，必定会出现偶数个L块
  // L块通过旋转可能有实际的四个形状，但一定有一边是竖着的，将该边视作L块所在的位置
  // 两个L块之前相隔的距离最小为1，位置偏移最小为2
  // 当距离奇数，另一个L需完美匹配自己，当距离偶数，另一个L为自己的左右对称，但无论哪种，两个L之间能且只能填充横着的-

  // 平铺的最大可能数，从末尾开始，等于开头分别放置竖-，两个-，L0或L3（情况合并）的情况之和
  // 提前考虑末尾四项的情况，便于处理，0，1，2分别表示竖着-，两个横-和L0+L3
  let tilingEnd = [[1, 0, 0], [1, 1, 0], [2, 1, 2], [5, 2, 4]];
  if (n <= 4) return tilingEnd[n - 1].reduce((f, b) => f + b);
  // 大于3则可以开始表演，声明一个少四个元素的数组，然后加上末尾的情况
  let tiling = new Array(n - 4).fill(0)
    .map(() => new Array(3).fill(0))
  // 可以concat拼接，或者push...+数组，会依次从最后一个元素开始push
  tiling = tiling.concat(tilingEnd.reverse());
  // tiling.push(...tilingEnd);
  // 从倒数第五个开始
  for (let i = n - 5; i >= 0; i--) {
    // 如果竖着的-，等于i+1位置的所有可能之和
    tiling[i][0] = tiling[i + 1].reduce((f, b) => f + b) % mod;
    // 如果两个-，等于i+2位置的所有可能之和
    tiling[i][1] = tiling[i + 2].reduce((f, b) => f + b) % mod;
    // 如果L0，普通的L或L3，上下翻转的L
    // 当对应的L在i+2,i+4等位置时，等于后一位：i+3,i+5等位置的情况之和，L0和L3合并，所以乘2
    // 当对应的L在i+3,i+5等位置时，类似距离奇数，等于i+4,i+6等位置的情况和*2
    // 上述两种情况可以合并，因此，从i+3开始遍历即可
    // 注意，对应的L可能位于结尾，此时只有一种情况，但L下一位不存在元素，需手动处理
    for (let j = i + 3; j <= n; j += 1)
      tiling[i][2] += 2 * (j == n ? 1 : tiling[j].reduce((f, b) => f + b) % mod);
    // console.log(tiling);
  }
  return tiling[0].reduce((f, b) => f + b) % mod;
};

// 简化上述代码
function numTilings_1(n: number): number {
  const mod = 1e9 + 7;
  let tilingEnd = [[1, 0, 0], [1, 1, 0], [2, 1, 2], [5, 2, 4]]; // 提前分析1～4，不想循环里判断了）
  if (n <= 4) return tilingEnd[n - 1].reduce((f, b) => f + b);
  let tiling = new Array(n - 4).fill(0)
    .map(() => new Array(3).fill(0))
    .concat(tilingEnd.reverse()); // 将L的两种情况合在一个空间，所以是3

  for (let i = n - 5; i >= 0; i--) {
    tiling[i][0] = tiling[i + 1].reduce((f, b) => f + b) % mod; // 竖-的情况
    tiling[i][1] = tiling[i + 2].reduce((f, b) => f + b) % mod; // 两个横-的情况
    for (let j = i + 3; j <= n; j += 1) // L的两种情况，要遍历所有情况，注意结尾的特判
      tiling[i][2] += 2 * (j == n ? 1 : tiling[j].reduce((f, b) => f + b) % mod);
  }
  
  return tiling[0].reduce((f, b) => f + b) % mod;
};