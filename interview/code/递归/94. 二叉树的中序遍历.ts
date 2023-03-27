// https://leetcode.cn/problems/binary-tree-inorder-traversal/
// 我直接递归
function inorderTraversal(root: TreeNode | null): number[] {
  if(!root) return [];
  // 不需要按层，我选择递归
  // const res: number[] = [];
  return inorderTraversal(root.left).concat(root.val).concat(inorderTraversal(root.right));
};