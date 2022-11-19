// https://leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/
// 普通递归方法
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return Math.max(maxDepth(root.right), maxDepth(root.left)) + 1;
};