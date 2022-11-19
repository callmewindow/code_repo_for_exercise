// https://leetcode.cn/problems/maximum-depth-of-binary-tree/
// 深度优先遍历，直接处理即可
function maxDepth(root: TreeNode | null): number {
  // 处理遍历结束的情况
  if (root == null) return 0;
  let depth_l = maxDepth(root.left);
  let depth_r = maxDepth(root.right);
  // 返回自身加两侧的最长值即可
  if (depth_l > depth_r) {
    return 1 + depth_l;
  } else {
    return 1 + depth_r;
  }
};