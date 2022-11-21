// https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/
// 每次将前序中序拆开，递归处理根节点实现
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // 处理空节点
  if (preorder.length == 0) return null;
  // 前序：先根节点，再左再右
  // 中序：先左，再中，再右
  let rootN = new TreeNode();
  rootN.val = preorder[0] // 根节点值
  // 不含重复所以可以利用检索将两个数组拆分为左右节点两部分
  let midI = inorder.indexOf(rootN.val); // 这里的脚标之前为左节点，后为右节点
  // console.log(midI);
  // left节点数量就是midI，按位置截断
  rootN.left = buildTree(preorder.slice(1, midI + 1), inorder.slice(0, midI));
  // right节点的数量是nodeLen - midI - 1
  rootN.right = buildTree(preorder.slice(midI + 1), inorder.slice(midI + 1));
  return rootN;
};