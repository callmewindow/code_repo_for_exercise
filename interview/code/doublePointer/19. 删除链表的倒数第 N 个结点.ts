// https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
// 增加前置节点，更优雅
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // 前置指针处理删除头部的情况
  const dummy = new ListNode(0, head);
  // 快慢指针
  let fast = dummy, slow = dummy;
  while (n--) fast = fast.next;
  // 此时fast比head快n，当fast为null，则now就是倒数第n个
  // 当fast到末尾，now的位置应该被删除
  // 因为开始前置了，所以第一次fast一定存在
  // 当fast不存在下一个，则说明slow的下一个要删除
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next
  return dummy.next;
};