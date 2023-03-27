// https://leetcode.cn/problems/reverse-nodes-in-k-group/
// 分组记录这一组的前、后、头节点、尾节点，封装进行反转
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // 将反转链表进行封装，不考虑head之前是什么，只在内部进行封装
  const myReverse = (head: ListNode, tail: ListNode) => {
    // 记录最后一个节点的下一个，用于更新head的下一个
    let prev = tail.next;
    let p = head; // 记录当前节点
    // tail表示最后一个
    while (prev !== tail) {
      // 记录下一个节点，用于后续更新当前节点
      const nex = p.next;
      // 让当前节点的下一个等于前一个
      p.next = prev;
      // 让钱一个等于自己
      prev = p;
      // 更新自己到下一个节点
      p = nex;
    }
    // 此时已经完成了对从head开始直到tail之后的反转，head之前还需要进行绑定
    return [tail, head];
  }
  // 新增一个辅助节点帮助进行prev的设定，不然还需要进行特判
  const hair = new ListNode(0);
  hair.next = head;
  let pre = hair;

  while (head) {
    // 这里每次都基于一个tail来记录本组反转的末尾位置
    let tail = pre;
    // 查看剩余部分长度是否大于等于 k
    for (let i = 0; i < k; ++i) {
      tail = tail.next;
      if (!tail) {
        return hair.next;
      }
    }
    const nex = tail.next;
    [head, tail] = myReverse(head, tail);
    // 把子链表重新接回原链表，即前面的那部分
    // 注意这里的head是已经经过reverse反转的head，所以可以确保pre指向正确的
    pre.next = head;
    // 这一步其实函数里已经做过了，即第一次循环
    tail.next = nex;
    // 更新pre为当前的末尾，准备下一组逆转
    pre = tail;
    // head即下一组的第一个节点
    head = tail.next;
  }
  return hair.next;
};