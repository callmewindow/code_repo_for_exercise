// https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof
// 这何尝不是一种暴力？填满二叉树，多次遍历判断是否满足
function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
  // 空的话都不会符合要求
  if (A == null || B == null) return false;
  // 单纯的bfs和dfs均无法处理多节点的情况
  // 可以将A和B填为满二叉树再判断，跳过缺失部分直接判断
  let nodeQ = [];
  let valDFSA = [], valDFSB = [];
  // 记录真值和假值的辅助数组
  let helpA: boolean[] = [], helpB: boolean[] = [];
  // let valBFSA = [], valBFSB = [];
  nodeQ.push(A);
  while (nodeQ.length > 0) {
    const tmpN = nodeQ.shift();
    // 对空节点用0填充，并标记为false
    valDFSA.push(tmpN == null ? 0 : tmpN.val);
    helpA.push(tmpN == null ? false : true);
    // 相比bfs，dfs每次都先看左边，因此需要把节点放在头部，因此先右再左
    // 自己是null或者左右都是null不再补充空节点
    if (tmpN == null || (tmpN.left == null && tmpN.right == null)) continue;
    // 否则直接填入right和left
    nodeQ.unshift(tmpN.right);
    nodeQ.unshift(tmpN.left);
  }

  nodeQ = [];
  nodeQ.push(B);
  while (nodeQ.length > 0) {
    const tmpN = nodeQ.shift();
    valDFSB.push(tmpN == null ? 0 : tmpN.val);
    helpB.push(tmpN == null ? false : true);
    if (tmpN == null || (tmpN.left == null && tmpN.right == null)) continue;
    nodeQ.unshift(tmpN.right);
    nodeQ.unshift(tmpN.left);
  }
  // console.log(valDFSA, '\n', valDFSB)
  let BinA = true;
  // 二层遍历判断是否包含
  for (let [iA, vA] of valDFSA.entries()) {
    if (vA != valDFSB[0]) continue;
    // 当等于时开始判断
    BinA = true;
    for (let [iB, vB] of valDFSB.entries()) {
      // 对false直接跳过
      if (!helpB[iB]) continue;
      // 不相等则退出循环，判断
      if (valDFSA[iA + iB] != vB) {
        BinA = false;
        break;
      }
    }
    if (BinA) return true;
  }
  return false;
};

