// https://leetcode.cn/problems/binary-tree-paths/
// 左右递归，根据有无后续连接字符串
function binaryTreePaths(root: TreeNode | null): string[] {
  // 不需要看和是多少，直接递归增加即可
  let res: string[] = [];
  let leftPath: string[] = [];
  let rightPath: string[] = [];
  // 先左
  if(root.left) {
    leftPath = binaryTreePaths(root.left);
  }
  // 再右
  if(root.right) {
    rightPath = binaryTreePaths(root.right);
  }
  // console.log(root.val, leftPath, rightPath)
  // 合并处理
  if(leftPath.length > 0 || rightPath.length > 0){
    res.push(...leftPath.map(path=>{
      path = root.val+'->'+path;
      return path;
    }));
    res.push(...rightPath.map(path=>{
      path = root.val+'->'+path;
      return path;
    }));
  }else{
    // 如果都没有就返回自己
    res.push(String(root.val));
  }
  return res;
};