// https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/
// 回溯直接基于tar进行dfs
function pathSum(root: TreeNode | null, target: number): number[][] {
  let res: number[][] = [];
  // 空则直接返回空，表示无法继续
  if (root == null) return res;
  let newTar = target - root.val;
  // 只有是叶子节点了才提前正常退出
  if (root.left == null && root.right == null) {
    // 值相等说明这条路正确，res等于root的值，否则这条路不对返回空值
    if (newTar == 0) res = [[root.val]];
    return res;
  }

  // 左右侧的拼接
  let leftPath = pathSum(root.left, newTar);
  let rightPath = pathSum(root.right, newTar);
  // 空则表示这条路不行，跳过，否则就是可以，和root.val进行拼接
  for (let lP of leftPath) res.push([root.val].concat(lP));
  for (let rP of rightPath) res.push([root.val].concat(rP));
  return res;
};
