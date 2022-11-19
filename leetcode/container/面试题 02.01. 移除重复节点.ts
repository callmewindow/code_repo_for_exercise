// https://leetcode.cn/problems/remove-duplicate-node-lcci
// set记录值判断是否出现
function removeDuplicateNodes(head: ListNode | null): ListNode | null {
  // set记录出现的值，为了实现移除，需判断next
  let res = head;
  if (head == null) return res;
  let nSet = new Set([head.val]);
  while (head.next != null) {
    // 只有当不重复时才往前走
    if (nSet.has(head.next.val)) {
      head.next = head.next.next;
    } else {
      nSet.add(head.next.val);
      head = head.next;
    }
  }
  return res;
};