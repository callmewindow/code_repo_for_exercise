// https://leetcode.cn/problems/sum-of-left-leaves/
// 直接遍历解决，判断是否具备左叶子
function sumOfLeftLeaves(root: TreeNode | null): number {
  if(root == null) return 0;
  let sum_of_left: number = 0;
  if (root.left != null) {
    if (root.left.left == null && root.left.right == null) {
      // 只有当左是叶子节点才直接加值
      sum_of_left += root.left.val;
    } else {
      sum_of_left += sumOfLeftLeaves(root.left);
    }
  }
  if (root.right != null) {
    sum_of_left += sumOfLeftLeaves(root.right);
  }
  // 对于只有一个节点的，根结点不算左叶子节点
  return sum_of_left;
};

// 基于对null的判断进行优化
function sumOfLeftLeaves_1(root: TreeNode | null): number {
  if (root == null) return 0; // 处理null
  let sum_of_left: number = 0;
  if (root.left != null && root.left.left == null && root.left.right == null) {
    // 只有当左是叶子节点才直接加值
    sum_of_left += root.left.val;
  }
  sum_of_left += sumOfLeftLeaves_1(root.left);
  sum_of_left += sumOfLeftLeaves_1(root.right);
  // 对于只有一个节点的，根结点不算左叶子节点
  return sum_of_left;
};