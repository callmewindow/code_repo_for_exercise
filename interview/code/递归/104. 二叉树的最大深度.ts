// https://leetcode.cn/problems/maximum-depth-of-binary-tree/
// 深度优先遍历，直接处理即可
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  let res = 1;
  res += Math.max(maxDepth(root.left), maxDepth(root.right));
  return res;
};