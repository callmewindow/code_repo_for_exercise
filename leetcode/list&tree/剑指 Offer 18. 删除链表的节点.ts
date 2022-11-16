// https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/
// 通过判断，分别存储头部和中间节点实现跳过
function deleteNode(head: ListNode | null, val: number): ListNode | null {
  if (head == null) return null;
  if (head.val == val) return head.next;

  let headTmp: ListNode | null = head;
  while (headTmp != null) {
    if (headTmp.next != null && headTmp.next.val == val) {
      // 直接跳过
      headTmp.next = headTmp.next.next;
      break;
    }
    headTmp = headTmp.next;
  }
  return head;
};