// https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/
// 比较花空间的从零搭建链表，勉强算过
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let headNew = new ListNode();
  let headHelp = new ListNode();
  // 因为要倒序，没必要到null的时候
  while (head && head.next) {
    let headN = head.next;
    // 第一次
    if (headNew.next == null) {
      head.next = null;
      headHelp = head;
    } else {
      headNew.val = head.val
      headHelp = headNew;
    }
    // 拼接链表
    headNew = new ListNode()
    headNew.next = headHelp;
    head = headN;
  }
  // 填上自己的值
  headNew.val = head.val;
  return headNew;
};

// 优化变量使用和判断逻辑，边读取变实现拼接
function reverseList_optimize(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr) {
    // 暂存next
    const next = curr.next;
    // 将curr的next变成prev，拼接当前数和此前的数
    // prev一开始是null，所以可以直接基于现有的拼接
    curr.next = prev;
    // 这里实现prev.next=prev
    prev = curr;
    curr = next;
  }
  return prev;
};