// https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/
// 根据找没找到调整返回值是节点还是null进行回溯
function lowestCommonAncestor_1(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // 关键点：自己也是自己的祖先
  // 如果是最近的公共祖先，则说明在这个节点遍历的过程中会同时遇到p和q
  // 所以对于返回值，遇到p和q之后返回p和q，第一个同时有p和q的返回自己即可

  // 为了按节点遍历，dps
  if (root == null) return null;
  let pNode: boolean = false, qNode: Boolean = false;
  let findLeft = lowestCommonAncestor(root.left, p, q);
  // 已经找到了就不找了，算了，太麻烦了，直接一块判断）
  let findRight = lowestCommonAncestor(root.right, p, q);
  // 判断是否找到了p或q
  pNode = root == p || findLeft == p || findRight == p;
  qNode = root == q || findLeft == q || findRight == q;
  // 按情况返回找到了什么
  if (pNode && qNode) return root;
  if (pNode) return p;
  if (qNode) return q;
  // 如果前面没返回，说明不是p和q，不是null则说明已经找到了p和q，返回这个节点即可
  // 因为前面没有返回，所以肯定要么null要么找到了root
  if (findLeft != null) return findLeft;
  if (findRight != null) return findRight;
  // 都没找到的返回null
  return null;
};