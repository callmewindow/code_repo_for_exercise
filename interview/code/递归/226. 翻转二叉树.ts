// https://leetcode.cn/problems/invert-binary-tree/
// 两个子树反转之后再反转
function invertTree(root: TreeNode | null): TreeNode | null {
  if(!root) return null; // 处理递归结束条件
  let left = root.left, right = root.right;
  // 反转之后再填充到另一边
  root.right = invertTree(left);
  root.left = invertTree(right);
  return root;
};