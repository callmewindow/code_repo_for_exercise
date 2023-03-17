// https://leetcode.cn/problems/3u1WK4/
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

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  // 因为重合所以一定有相同长度的末尾，a是a+n，b是b+n，若要找到相同长度
  // 只需要a和b同时走，当a到末尾时开始遍历b的，b到末尾遍历a的
  // 这样会同时走完a+n+b和b+n+a的长度，进而判断此时的节点是否相同，相同便是第一个交点

  // 朴素方法就是记录引用了
};