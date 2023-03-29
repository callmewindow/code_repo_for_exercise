// https://leetcode.cn/problems/merge-two-binary-trees/
// 处理好回溯条件即可
function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  // 同步向后读，null则停下
  if(!root1 && !root2) return null;
  if(!root1 || !root2) return root1 ? root1 : root2;
  // 都不是null则合并，处理子树
  // 新建节点进行合并
  let newRoot = new TreeNode(root1.val + root2.val);
  newRoot.left = mergeTrees(root1.left, root2.left);
  newRoot.right = mergeTrees(root1.right, root2.right);
  return newRoot;
};