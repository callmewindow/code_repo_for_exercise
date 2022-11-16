// https://leetcode.cn/problems/path-sum/
// 直接左右递归，循环到底部
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // 空肯定不符合
  if (root == null) return false;
  // 如果根节点+左或者+右符合就可以
  if (root.left != null) {
    if (hasPathSum(root.left, targetSum - root.val)) return true;
  }
  if (root.right != null) {
    if (hasPathSum(root.right, targetSum - root.val)) return true;
  }
  // 或者没有左右节点，自己等于值也可以
  if (root.left == null && root.right == null) {
    if (root.val == targetSum) return true;
  }
  return false;
};

// 优化上述代码
function hasPathSum_1(root: TreeNode | null, targetSum: number): boolean {
  // 空肯定不符合
  if (root == null) return false;
  // 没有左右节点，自己等于值可以
  if (root.left == null && root.right == null) return root.val == targetSum
  // 如果根节点+左或者+右符合也可以，不需要判断是否null，因为函数会处理
  const newTarget = targetSum - root.val;
  return hasPathSum(root.left, newTarget) || hasPathSum(root.right, newTarget);
};