// https://leetcode.cn/problems/delete-middle-node-lcci/
// 通过依次修改next实现基于目前node的删除节点
var deleteNode_1 = function (node) {
  // 单向节点，不可能找到之前的值，只能修改当前位置
  // 又因为无法修改当前节点，因此直接将下一个的值复制到自己，然后最后截断一个
  while (node != null) {
    // 不是尾节点，肯定有next
    // 如果是末尾就在更新后替换
    node.val = node.next.val;
    // 因为node修改自己不会影响节点，因此需要提前判断
    if (node.next.next == null) node.next = null;
    node = node.next;
  }
  return;
};

// 替换当前值之后直接拼接
var deleteNode_2 = function (node) {
  // 不是中间节点可以直接拼接
  node.val = node.next.val;
  node.next = node.next.next;
  return;
};