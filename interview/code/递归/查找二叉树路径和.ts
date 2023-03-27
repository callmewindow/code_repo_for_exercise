type BinaryNode = {
  data: any;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

/**
 * 利用回溯算法，找到和为某一值的路径，一定要到叶子结点结束
 * @param node 二叉树节点
 * @param target 目标值
 * @param path 路径数组
 * @param sum 当前路径的和
 * @param result 存储所有的结果
 */
function findPathToLeaf(
  node: BinaryNode | null,
  target: number,
  path: number[] = [],
  sum: number = 0,
  result: number[][] = []
): number[][] {
  if (!node) {
    // 空节点，直接返回
    return result;
  }

  path.push(node.data);
  sum += node.data;

  // 找到路径
  if (sum === target && !node.left && !node.right) {
    result.push([...path]);
  }

  findPathToLeaf(node.left, target, path, sum, result);
  findPathToLeaf(node.right, target, path, sum, result);

  path.pop();
  return result;
}

/**
 * 利用回溯算法，找到和为某一值的路径
 * @param {object} node - 二叉树节点
 * @param {number} num - 目标值
 * @param {array} path - 路径
 * @param {number} sum - 当前路径的和
 * @param {array} result - 存储所有的结果
 */
function findPath(
  node: BinaryNode,
  num: number,
  path: number[] = [],
  sum: number = 0,
  result: number[][] = []
): number[][] {
  // 将当前节点值添加到路径中，并更新路径和
  path.push(node.data);
  sum += node.data;

  // 判断是否找到了符合要求的路径
  if (sum === num) {
    result.push([...path]); // 将符合要求的路径添加到结果中
  }

  // 在左子树中继续寻找符合要求的路径
  if (node.left) {
    findPath(node.left, num, path, sum, result);
  }

  // 在右子树中继续寻找符合要求的路径
  if (node.right) {
    findPath(node.right, num, path, sum, result);
  }

  // 回溯：将路径中最后一个节点弹出，恢复路径和
  path.pop();
  sum -= node.data;

  return result;
}
