// DFS - 递归
type TreeNode = {
  id:number,
  children: TreeNode[],
}
function deepTree(tree: TreeNode[], arr: number[] = []) {
  if (!tree || !tree.length) return arr;
  tree.forEach(data => {
    arr.push(data.id);
    // 遍历子树，传入数组是为了基于引用同步值
    data.children && deepTree(data.children, arr);
  });
  return arr;
}
// DFS - 非递归
function deepTreeQueue(tree: TreeNode[]) {
  if (!tree || !tree.length) return;
  let arr: number[] = [];
  let queue: TreeNode[] = [];
  //先将第一层节点放入栈，dfs时用队列保存兄弟节点情况
  for (let i = 0, len = tree.length; i < len; i++) {
    queue.push(tree[i]);
  }
  let node: TreeNode | undefined;
  while (queue.length) {
    // 获取当前第一个节点
    node = queue.shift();
    if(node === undefined) break;
    arr.push(node.id);
    //如果该节点有子节点，继续添加进入栈顶
    if (node.children && node.children.length) {
      // 将新节点放在最前面
      queue = node.children.concat(queue);
    }
  }
  return arr;
}
// BFS - 递归
function bfsTraversal(rootNodes: TreeNode[]): number[] {
  const result: number[] = [];

  function traverse(node: TreeNode) {
    result.push(node.id);
    if (node.children.length > 0) {
      node.children.forEach((child) => traverse(child));
    }
  }

  rootNodes.forEach((root) => traverse(root));

  return result;
}


// BFS - 非递归
function rangeTreeQueue(tree: TreeNode[]) {
  if (!tree || !tree.length) return;
  let arr: number[] = [];
  let node: TreeNode | undefined, list = [...tree];
  // 取出当前节点
  while ((node = list.shift())) {
    // 因为不需要记录每一层的情况，只需要遍历即可，所以可以无脑遍历
    arr.push(node.id);
    // 当前文存在才会执行后面的语句
    node.children && list.push(...node.children);
  }
  return arr;
}
