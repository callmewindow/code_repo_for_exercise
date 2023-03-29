// https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/
// 尝试寻找自己和公共，同步进行
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // 扩大该函数的能力，从找最近公共调整到找p或q的最近节点，如果左右分别是pq的最近节点，那么自己就是他们的最近公共
  if(!root) return null;
  // 找到对应内容直接返回，如果另一个在他的子树，那么当前位置也一定是最近公共
  if(root.val === p.val || root.val === q.val) return root;
  // 否则尝试在子树中寻找p和q
  const left = lowestCommonAncestor(root.left, p , q);
  const right = lowestCommonAncestor(root.right, p , q);
  // 如果两个都找到了则自己就是
  if(left && right) return root;
  else if(!left && !right) return null; // 都没找到直接null，否则返回找到的
  else return left ? left : right;
}