// https://leetcode.cn/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/
// 根据二叉搜索树性质来选择性回溯
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // 关键点：自己也是自己的祖先
  // 如果是最近的公共祖先，则说明在这个节点遍历的过程中会同时遇到p和q
  if (!root || !p || !q) return null;
  // 对于返回值，因为是二叉搜索树，左右有大小比较，因此可看是在一边还是两边来选择性回溯
  let pV = p.val, qV = q.val, rV = root.val;
  // 一左一右是自己
  if ((pV <= rV && qV >= rV) || (pV >= rV && qV <= rV)) return root;
  // 都左
  if (pV <= rV && qV <= rV) return lowestCommonAncestor(root.left, p, q);
  else return lowestCommonAncestor(root.right, p, q); // 都右
};