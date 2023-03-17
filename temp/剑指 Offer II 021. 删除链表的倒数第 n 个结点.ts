// https://leetcode.cn/problems/SLwz0R/
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // 因为一定符合条件，所以弄两个指针
  // 一个指0，一个指n，同步前进，当指n的到末尾了（走了m-n个），此时指0的下一个就是倒数第n个（正数第m-n个）
  // 然后就指0的指针让自己的next等于next的next，返回头部即可
  
};