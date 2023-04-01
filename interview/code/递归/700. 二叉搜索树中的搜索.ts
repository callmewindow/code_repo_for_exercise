// https://leetcode.cn/problems/search-in-a-binary-search-tree/
// 左右寻找
function searchBST(root: TreeNode | null, val: number): TreeNode {
  if (!root) return null;
  if (val === root.val) {
      return root;
  } else {
      if (val > root.val) return searchBST(root.right, val);
      else return searchBST(root.left, val);
  }
}