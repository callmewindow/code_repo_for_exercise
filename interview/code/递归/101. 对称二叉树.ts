// https://leetcode.cn/problems/symmetric-tree/
// 基于对称判断函数处理左右
function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true; // 是null是一定是true
  function checkSym(root1: TreeNode | null, root2: TreeNode | null): boolean {
    // 判断两个节点是否对称
    if (!root1 || !root2) {
      if (!root1 && !root2) return true;
      else return false;
    }
    // 都有值则比较值，然后比较他们的左右
    if (root1.val !== root2.val) return false;
    // 注意对称需要交叉对比
    return checkSym(root1.left, root2.right) && checkSym(root1.right, root2.left);
  }
  return checkSym(root.left, root.right);
};