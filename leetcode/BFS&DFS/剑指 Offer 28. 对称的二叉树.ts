// https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof
// dfs可以更加准确的判断是否相同，可以规避同层影响
function isSymmetric(root: TreeNode | null): boolean {
  // 对左节点做前序遍历，对右节点做后序遍历，看结构是否一致，但对空节点需要填补，防止都是左叶子情况的出现
  // bfs无法处理同一层数据平移的问题，需要使用dfs
  if (root == null) return true;
  let leftN = root.left, rightN = root.right;
  // 要么全空要么全有
  if (leftN == null && rightN == null) return true;
  if (leftN == null || rightN == null) return false;

  let leftQ: TreeNode[] = [], rightQ: TreeNode[] = [];
  leftQ.push(leftN);
  rightQ.push(rightN);
  let tmpN: TreeNode;

  while (leftQ.length > 0 && rightQ.length > 0) {
    // 同步处理左右，判断值是否相等
    tmpN = leftQ.shift();
    const lVal = tmpN == null ? null : tmpN.val;
    // 只有当自己空或是叶子结点才不传值
    if (tmpN != null && (tmpN.left != null || tmpN.right != null)) {
      // 否则无论是否空都需要传入，以完全判断
      leftQ.unshift(tmpN.left);
      leftQ.unshift(tmpN.right);
    }
    // 右边后序遍历，需要调整
    tmpN = rightQ.pop()
    const rVal = tmpN == null ? null : tmpN.val;
    if (tmpN != null && (tmpN.left != null || tmpN.right != null)) {
      rightQ.push(tmpN.right);
      rightQ.push(tmpN.left);
    }
    // console.log(lVal, rVal, lVal == rVal, lVal != rVal);
    if (lVal != rVal) return false;

  }
  // 也有可能因为长度不一致提前退出，需判断是否都是长度0
  return leftQ.length == 0 && rightQ.length == 0;
};