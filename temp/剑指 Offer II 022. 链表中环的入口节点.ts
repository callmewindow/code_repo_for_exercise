// https://leetcode.cn/problems/c32eOV/
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

function detectCycle(head: ListNode | null): ListNode | null {
  // 最简单的方法：记录n个节点的引用，一直走，看最先遇到哪个节点，很花空间
  // 但是感觉也没有别的招了
  
};