// https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof
// 两次遍历寻找节点
function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
  // 最朴素的就是两次遍历，第一次遍历计数，第二次遍历寻找，复杂度为head长度l
  // 如果要一次遍历，那么就只能对k进行存储，判断k次后head是不是null，复杂度反而提高为l*k
  let headLen = 0;
  let headBP: ListNode | null = head;
  while (head != null) {
    headLen++;
    head = head.next;
  }
  // 长度不够直接null
  if (headLen < k) return null;
  // 统计正常顺序的值，继续从1开始
  let newK = headLen - k + 1;
  while (newK > 1 && headBP) {
    headBP = headBP.next;
    newK--;
  }

  return headBP;
};

// 双指针，声明一个快k的节点，当快k为null，head便是倒数第k个
function getKthFromEnd_1(head: ListNode | null, k: number): ListNode | null {
  if (!head) return null;
  let fastK: ListNode | null = head;
  while (k > 0 && fastK) {
    fastK = fastK.next;
    k--;
  }
  if(!fastK) return null;
  // 同步后移
  while (fastK && head) {
    fastK = fastK.next;
    head = head.next;
  }
  return head;
};