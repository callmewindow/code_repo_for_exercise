// https://leetcode.cn/problems/kth-node-from-end-of-list-lcci/
// 快慢指针
function kthToLast(head: ListNode | null, k: number): number {
  // 因为到倒数第k个，倒数第1个就是两个节点a，b，b比a快k，bnull时a就是对应的
  let fast = head;
  while (k-- > 0) fast = fast.next;
  while (fast != null) {
    head = head.next;
    fast = fast.next;
  }
  return head.val;
};