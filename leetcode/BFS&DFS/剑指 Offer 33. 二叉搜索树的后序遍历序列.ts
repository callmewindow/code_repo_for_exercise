// https://leetcode.cn/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/
// 根据后序遍历性质将树拆成三部分进行判断
function verifyPostorder(postorder: number[]): boolean {
  // 根据后续遍历的性质，最后一个需要是根节点
  // 因此遇到比根节点大的值便说明从这里开始是根节点的右子树，前面的构成根节点的左子树
  // 右子树应该全部大于根节点

  // 进而对左右进行同样的判断即可
  return recur(postorder, 0, postorder.length - 1);
};

function recur(node: number[], i: number, j: number): boolean {
  // i为起始点，j为根节点
  if (i >= j) return true;
  let m = i;
  while (node[m] < node[j]) m++;
  // if(node[m] == node[j]) 说了不会相等，因此判断即可

  // 注意因为需要全部大于j，需要保留遍历的坐标来判断
  let k = m;
  // for(;k<=i-1;k++) if(node[k] < node[j]) return false;
  // 直接找到不大于的点来判断
  while (node[k] > node[j]) k++;
  if (k != j) return false;

  // 然后看子树
  return recur(node, i, m - 1) && recur(node, m, j - 1);
}