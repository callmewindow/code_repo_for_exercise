// https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// 朴素基于根节点递归
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // 确保pre和in是相同长度
  const n = preorder.length;
  if (n === 0) return null;
  // 如果空，则直接null
  // 如果一个点则直接返回
  // pre：根，左，右， in：左，根，右
  // 基于pre找到根，结合in拆分出左和右
  // 结合左数量拆分出pre的左和右
  // 对左右分别调用build函数，基于根建立节点，让节点分别等于左右
  const rootVal = preorder[0];
  let i = 0;
  // 无重复元素所以直接循环找
  while (inorder[i] !== rootVal) i++;
  // 此时0～i-1为左树，i+1到n-1为右树
  // 形成二叉树
  const root = new TreeNode(rootVal);
  // slice取左不取右
  root.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  root.right = buildTree(preorder.slice(i + 1, n), inorder.slice(i + 1, n));
  return root;
};
