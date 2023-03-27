// https://leetcode.cn/problems/binary-tree-level-order-traversal/
// 队列记录每层节点情况，循环处理
function levelOrder(root: TreeNode | null): number[][] {
  // 需要二维数组保存，直接用队列
  if(root === null) return [];
  const queue: TreeNode[] = [root];
  const res: number[][] = [];
  while(queue.length > 0){
    const layer: number[] = [];
    // 这里不能动态获取，否则每次会重复计算
    const len = queue.length
    for(let i = 0;i<len;i++){
      const now = queue.shift();
      layer.push(now.val);
      if(now.left) queue.push(now.left);
      if(now.right) queue.push(now.right);
    }
    res.push(layer);
  }
  return res;
};