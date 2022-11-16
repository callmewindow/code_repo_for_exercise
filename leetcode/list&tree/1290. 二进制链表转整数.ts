// https://leetcode.cn/problems/convert-binary-number-in-a-linked-list-to-integer/
// 根据题意按顺序读取，并按进位运算对数据进行更新
function getDecimalValue(head: ListNode | null): number {
  if(!head) return 0;
  // 记录总和
  let sum: number = 0;
  while (head.next != null) {
    // 每次乘二相当于多了一位
    sum = sum * 2 + head.val
    head = head.next;
  }
  // 加上最后一个
  sum = sum * 2 + head.val
  return sum
};

// 替换为位运算，但是并没有加速）
function getDecimalValue_optimize(head: ListNode | null): number {
  // 记录总和
  let sum: number = 0;
  while (head) {
    // 左进位表示二进制进位
    sum <<= 1;
    // 因为val为1或0，所以直接或相当于做加法，完全位运算
    sum |= head.val;
    head = head.next;
  }
  return sum
};