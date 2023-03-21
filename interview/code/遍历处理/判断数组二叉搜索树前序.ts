function preOrderOfBST(list: number[]): boolean {
  if (list && list.length > 0) {
    // 前序遍历，第一个值为根节点
    const root = list[0];
    // 只有一个节点时，会直接返回root

    // 找到数组中，第一个比根节点大的节点，即为右子树的节点
    let i: number;
    for (i = 0; i < list.length; i++) {
      if (list[i] > root) {
        break;
      }
    }

    // 遍历右子树的节点，要求所有右子树的节点都比根节点大
    let j: number;
    for (j = i; j < list.length; j++) {
      if (list[j] < root) {
        return false;
      }
    }

    let left = true;
    // 同理，递归判断左子树是否符合二叉查找树的规则
    if (i > 1) {
      left = preOrderOfBST(list.slice(1, i + 1));
    }

    let right = true;
    // 递归判断右子树是否符合二叉查找树的规则
    if (i < list.length) {
      right = preOrderOfBST(list.slice(i, list.length));
    }

    // 左、右子树都符合要求，则是一个二叉查找树
    return left && right;
  }
  return false;
}
