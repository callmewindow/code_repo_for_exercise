// https://leetcode.cn/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/
// 中序遍历+记录前一个节点实现调整
// 为了在整个函数调用期间同步信息，声明全局变量
var pre, head;

// 中序遍历
var dfs = function (cur) {
  if (cur == null) return; // 到终点则返回
  dfs(cur.left);

  // pre是null时表示这是读到的第一个元素，所以需要设定头节点
  if (pre == null) head = cur;
  else pre.right = cur; // 否则cur一定比pre大，所以pre的右为cur

  cur.left = pre;
  pre = cur; // 替换pre，去读下一个节点
  dfs(cur.right);
};
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
  // js的全局注意清空全局变量
  pre = null;
  head = null;

  // 处理空节点
  if (root == null) return null;
  dfs(root);
  // 当dfs结束，pre会成为最后一个节点，处理头和尾
  head.left = pre;
  pre.right = head;
  return head;
};