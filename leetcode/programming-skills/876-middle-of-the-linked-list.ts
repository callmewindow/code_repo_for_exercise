// 使用双指针分别前进，二倍指针到终点即表示一倍指针在中间
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

 function middleNode(head: ListNode | null): ListNode | null {
    // 一次前进两个的节点
    let head_2: ListNode = head;
    // 当head_2到结尾时停止，此时head长度为奇数
    while(head_2.next != null){
        // 保持head_2到达的位置是head的二倍
        if(head_2.next.next == null){
            // 如果next没有next，表示head长度为偶数
            // 此时head还在前半部分，因此还需要前进一位
            head = head.next;
            break;
        }else{
            head = head.next;
            head_2 = head_2.next.next;
        }
    }
    return head;
};

// 优化循环，减少可读性，提高nb性）
function middleNode_optimize(head: ListNode | null): ListNode | null {
    // 一次前进两个的节点
    let head_f: ListNode = head;
    // 当head_f已经成为了null（偶数长）或在倒数第一个（奇数长）
    while(head_f != null && head_f.next != null){
        head_f = head_f.next.next;
        // 如果是偶数，本次循环后head_f会成为null，则head也相当于多进了一位
        head = head.next;
    }
    return head;
};