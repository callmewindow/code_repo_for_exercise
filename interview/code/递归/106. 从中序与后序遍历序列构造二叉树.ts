// https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
// 朴素基于根节点拆分递归
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  const n = inorder.length;
  if(n === 0) return null;
  // in：左，根，右，post：左，右，根
  // 基于post的最后一个，找到根；基于根拆分in的左和右
  const rootVal = postorder[n-1];
  let i = 0;
  while(inorder[i] !== rootVal) i++;
  // 此时i位于根节点，0～i-1为左，i+1到n-1为右
  // 基于长度拆分post的左和右
  // 基于左右调用build，用根建立节点连接
  const root = new TreeNode(rootVal);
  root.left = buildTree(inorder.slice(0,i), postorder.slice(0,i));
  root.right = buildTree(inorder.slice(i+1,n), postorder.slice(i,n-1));
  // 如果空返回null也直接拼接即可
  return root;
};
