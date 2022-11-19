// https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/
// 结合深度判断进行平衡的判断
function getDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return Math.max(getDepth(root.left), getDepth(root.right)) + 1;
}
function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true;
  // 当前是平衡的有且只有两个子树都是平衡二叉树，而且两个子树的深度差也不超过1
  let selfCheck = Math.abs(getDepth(root.left) - getDepth(root.right)) <= 1;
  return selfCheck && isBalanced(root.left) && isBalanced(root.right);
};

// 把绝对值和最大值优化为运算
function getDepth_1(root: TreeNode | null): number {
  if (!root) return 0;
  let depLeft = getDepth(root.left), depRight = getDepth(root.right);
  return (depLeft >= depRight ? depLeft : depRight) + 1;
}
function isBalanced_1(root: TreeNode | null): boolean {
  if (!root) return true;
  // 当前是平衡的有且只有两个子树都是平衡二叉树，而且两个子树的深度差也不超过1
  let inter = getDepth(root.left) - getDepth(root.right);
  let selfCheck = inter == 0 || inter == 1 || inter == -1;
  return selfCheck && isBalanced(root.left) && isBalanced(root.right);
};

// 最后检查根节点的左右长度，时间直接爆炸
function getDepth_2(root: TreeNode | null): number {
  if (!root) return 0;
  let depLeft = getDepth(root.left), depRight = getDepth(root.right);
  return (depLeft >= depRight ? depLeft : depRight) + 1;
}
function isBalanced_2(root: TreeNode | null): boolean {
  if (!root) return true;
  // 当前是平衡的有且只有两个子树都是平衡二叉树，而且两个子树的深度差也不超过1
  let inter = getDepth(root.left) - getDepth(root.right);
  let selfCheck = inter == 0 || inter == 1 || inter == -1;
  return isBalanced(root.left) && isBalanced(root.right) && selfCheck
};