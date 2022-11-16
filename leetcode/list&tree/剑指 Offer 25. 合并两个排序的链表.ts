// https://leetcode.cn/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof
// 分别遍历读取的方式进行处理
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // 简单题，两个头节点分别往前走，谁小新链表的下一个节点是谁
  // 处理可能有null的情况
  if (l1 == null || l2 == null) return l1 != null ? l1 : l2;
  let l3 = new ListNode();
  let res = l3;
  while (l1 != null && l2 != null) {
    l3.val = l1.val < l2.val ? l1.val : l2.val;
    if (l1.val < l2.val) l1 = l1.next;
    else l2 = l2.next;
    // 当l1l2下一个都有值才新建，此时l1和l2都已经next，所以直接判断
    if (l1 != null && l2 != null) {
      l3.next = new ListNode();
      l3 = l3.next;
    } else {
      // 如果此时有一个没有值，则说明l3不用等于next，直接拼接剩余的即可
      l3.next = l1 != null ? l1 : l2;
      break;
    }
  }
  return res;
};