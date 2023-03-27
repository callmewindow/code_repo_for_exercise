// https://leetcode.cn/problems/path-sum/
// 直接左右递归，循环到底部
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // 需要到叶子结点才算一条路径，因此需要判断左右孩子
  if (!root) return false;
  const findSum = targetSum - root.val;
  // 如果已经为0，则需要判断是不是叶子
  if (findSum === 0 && root.left === null && root.right === null) { return true; }
  // 因为val有正有负，所以即使不是叶子也可以继续找
  if (hasPathSum(root.left, findSum) || hasPathSum(root.right, findSum)) return true;
  return false;
};