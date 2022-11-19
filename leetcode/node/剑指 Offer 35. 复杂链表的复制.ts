// https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/
// map记录节点实现一一对应
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (head == null) return;
  // 处理null的情况，需要两层数组
  let nodeMap = new Map([[null, null]])
  let cur = head;
  while (cur != null) {
    let newCur = new Node(cur.val);
    // 保存节点对应关系
    nodeMap.set(cur, newCur);
    cur = cur.next;
  }
  cur = head;
  while (cur != null) {
    // 完善next和random搭建对应关系
    let newCur = nodeMap.get(cur);
    newCur.next = nodeMap.get(cur.next);
    newCur.random = nodeMap.get(cur.random);
    cur = cur.next;
  }
  return nodeMap.get(head);
};

// 先将新节点和旧节点连接起来，然后依次基于cur处理cur.next实现拆分
var copyRandomList_1 = function (head) {
  if (head == null) return head;
  let cur = head;
  while (cur != null) {
    // 将新的cur插入到cur的下一个
    let newCur = new Node(cur.val);
    newCur.next = cur.next;
    cur.next = newCur;
    cur = cur.next.next;
  }
  // 此时结构为：1,n1,2,n2,,,
  cur = head;
  // 先插入random，否则next没了
  while (cur != null) {
    // 新节点的random就等于旧节点的random的下一个，即新节点，null就是null
    cur.next.random = cur.random == null ? null : cur.random.next;
    cur = cur.next.next;
  }
  
  // 为了后面处理时正常找位置，这里应该是next，即新节点
  cur = head.next;
  // 注意最后head还需要恢复回去
  let res = head.next;
  // 再拆分next
  while (cur != null) {
    // 结尾退出，cur为后面的那个，所以判断cur
    // 此时head位于结尾的1，但结尾1的next应该是null，现在是新节点，所以需要手动调整next
    if (cur.next == null) {
      head.next = null;
      break;
    }
    // 先重定向head的next
    head.next = head.next.next;
    head = head.next;

    // 新节点的next等于下一个旧节点的next
    cur.next = cur.next.next;
    // 这里next已经变成下一个新节点了，所以直接next就可以
    cur = cur.next;
  }
  return res;
};