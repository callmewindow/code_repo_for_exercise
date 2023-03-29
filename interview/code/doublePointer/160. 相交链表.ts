// https://leetcode.cn/problems/intersection-of-two-linked-lists/
// 双指针移动
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  // a的组成：a+c，b的组成：b+c，c为重复位置
  // 通过双指针同时移动，a遍历结束，a的指针指向b；b同理，进而同时走完a+b+c便可相遇在第一个交点
  if(!headA || !headB) return null;
  let curA = headA, curB = headB;
  // 这里不需要担心同时到达null的情况
  // 如果他们相交，会在null前返回；如果不想交则确实应该null
  while(curA !== curB){
    // console.log(curA, curB);
    curA = curA === null ? headB : curA.next;// 切换阵营
    curB = curB === null ? headA : curB.next;
  }
  return curA; // 当循环退出：要么遇到了相交，要么遇到了末尾的null
};