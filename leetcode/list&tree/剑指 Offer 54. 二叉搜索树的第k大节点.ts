// https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/
// 全局变量记录k的变化，按顺序处理
// 为了在整个函数调用期间同步信息，声明全局变量，当k=0时，kTh就是第k大的元素
let kTh: TreeNode | null, kG: number;

// 反向中序遍历找最大节点
function dfsR(cur: TreeNode | null): boolean {
  if (cur == null) return false; // 到终点则返回

  // 因为找第k大，所以从右找
  let find: boolean;
  find = dfsR(cur.right);
  if (find) return true;// 已经找到了就退出，否则继续

  // 每到一个节点都是从大到小到大的
  // console.log(cur.val);
  kG--;
  // kG=0即当前节点为对应的节点
  if (kG == 0) {
    kTh = cur;
    return true;
  }

  find = dfsR(cur.left);
  if (find) return true;
  return false;
}
function kthLargest(root: TreeNode | null, k: number): number {
  // 处理空节点
  if (root == null) return -1;
  // 初始化全局变量
  kTh = null;
  kG = k;
  // 当dfsR结束，kTh为最大的，根据题意一定有
  dfsR(root);
  return kTh.val;
}