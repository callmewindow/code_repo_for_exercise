// https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/
// 数组辅助记录当前节点和孩子节点
function levelOrder(root: TreeNode | null): number[] {
  if (root == null) return [];
  let nodeList = [root];
  let valList = [];
  let i = 0;
  while (i < nodeList.length) {
    if (nodeList[i] != null) {
      // 不是null则调整root指向然后增加值
      root = nodeList[i];
      valList.push(root.val);
      nodeList.push(root.left);
      nodeList.push(root.right);
    }
    i++;
  }
  return valList;
};

// 使用队列更加优美的实现
function levelOrder_1(root: TreeNode | null): number[] {
  if (root == null) return [];
  let nodeQueue = [];
  let valList = [];
  nodeQueue.push(root);
  // 队列push和pop，可以实现不基于i进行节点的管理
  while (nodeQueue.length > 0) {
    root = nodeQueue.shift();
    valList.push(root.val);
    // null直接跳过即可，只需按顺序输出即可
    if (root.left != null) nodeQueue.push(root.left);
    if (root.right != null) nodeQueue.push(root.right);
  }
  return valList;
};