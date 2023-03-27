// https://leetcode.cn/problems/linked-list-cycle/
// 快慢指针相遇寻找环
function hasCycle(head: ListNode | null): boolean {
  if (!head) return false;
  // 利用快慢指针看环，当一个指针每次前进2，另一个每次前进1
  // 快指针在环中一定会追上慢指针
  let slow = head, fast = head;
  // 如何判断没有环：有一个指针到了末尾
  // 确保slow和fast都不是null防止报错
  while (slow && fast) {
    // 先移动再判断，确保移动了
    slow = slow.next;
    fast = fast.next ? fast.next.next : null; // 自己变null让循环退出
    // console.log(slow.val, fast.val);
    // 注意这里需要确保他们不是null
    if (slow && fast && slow === fast) return true;
  }
  return false;
};