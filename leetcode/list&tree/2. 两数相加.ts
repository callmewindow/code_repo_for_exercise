// https://leetcode.cn/problems/add-two-numbers
// 逆序加和，进位处理
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // 因为是倒序，所以没办法*10再+，为了利用倒序的性质，可以同步读取，计算后加到前一位
  let lSum = new ListNode();
  // 临时保存头节点
  let res = lSum;
  // 都是null才退出
  while (l1 != null && l2 != null) {
    const sum = l1.val + l2.val;
    if (sum >= 10) {
      lSum.val = sum - 10;
      // 将多的1加到l1上，l1下一个可能是null，所以需要判断
      if (l1.next == null) l1.next = new ListNode(1);
      else l1.next.val += 1;
    } else {
      lSum.val = sum;
    }
    // 只有当后面有需要添加的值时才新建
    if (l1.next != null || l2.next != null)
      lSum.next = new ListNode()

    lSum = lSum.next;
    l1 = l1.next;
    l2 = l2.next;
  }
  let ll = l1 != null ? l1 : l2;
  // 把l1和l2多的值加上
  while (ll != null) {
    // 这里也需要判断val，因为可能为10
    const sum = ll.val;
    if (sum >= 10) {
      lSum.val = sum - 10;
      // 将多的1加到l1上，l1下一个可能是null，所以需要判断
      if (ll.next == null) ll.next = new ListNode(1);
      else ll.next.val += 1;
    } else {
      lSum.val = sum;
    }
    // 防止末尾多一个空节点，所以判断next
    if (ll.next != null)
      lSum.next = new ListNode();
    lSum = lSum.next;
    ll = ll.next;
  }
  return res;
};