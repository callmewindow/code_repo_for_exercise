// https://leetcode.cn/problems/merge-two-sorted-lists/
// 双指针同时前进读取
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // 双指针不断后移
  // 注意要拼接所有节点，不能新建，所以需要注意list的移动
  if (!list1) return list2;
  if (!list2) return list1;
  // 先确定一个根节点
  let head: ListNode | null = null;
  if (list1.val > list2.val) {
    head = list2;
    list2 = list2.next;
  } else {
    head = list1;
    list1 = list1.next;
  }
  let now = head; // 记录当前节点
  while (list1 || list2) {
    // 有一个有值就继续
    const val1 = list1 ? list1.val : 666;
    const val2 = list2 ? list2.val : 666;
    // 选择小的进行push
    if (val1 > val2) {
      now.next = list2;
      list2 = list2.next;
    } else {
      now.next = list1;
      list1 = list1.next;
    }
    now = now.next;
  }
  return head;
};