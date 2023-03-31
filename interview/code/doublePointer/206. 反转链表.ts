// https://leetcode.cn/problems/reverse-linked-list/
// 利用节点的缓存性质进行前中后的记录和切换
function reverseList(head: ListNode | null): ListNode | null {
  // 没要求直接在head上操作，所以完全可以记录下来每个节点的引用然后再处理，但是不够优雅
  if(!head) return null;
  if(!head.next) return head;
  // 只处理多个节点的
  let now = head;
  let prev = null;
  let after = now.next;
  while(after){
    // 自己指向前一个
    now.next = prev;
    // 前一个成为自己
    prev = now;
    // 自己成为下一个
    now = after;
    // 下一个进行更新
    after = after.next;    
  }
  // 如果没有after，则说明此时after是末尾，now是最后一个，prev是倒数第二个
  now.next = prev;
  return now;
};

// 简化版
function reverseList_1(head: ListNode | null): ListNode | null {
  // 因为需要反转之后末尾指向null，这里不能新建辅助节点
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // 此时prev就是最后一个节点
  return prev;
};