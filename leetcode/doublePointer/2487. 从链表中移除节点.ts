// https://leetcode.cn/problems/remove-nodes-from-linked-list/
// 将链表处理为非严格递减的数组，遍历后倒序处理，双指针保存位置
function removeNodes(head: ListNode | null): ListNode | null {
  if (!head) return null;
  // 根据题意即只要后面有比自己大的就剔除，将链表删除成为一个非严格递减的形式
  // 先遍历然后找即可
  let nodeList: ListNode[] = [];
  while (head != null) nodeList.push(head), head = head.next;
  const nLen = nodeList.length;
  // 需要记录两个位置：头节点和正在处理的节点
  // 头节点需要时最大的，正处理的节点需要比前一个正在处理的节点小
  let res = nodeList[nLen - 1], now = res; // 尾部一定是len-1:1.他比别人大，只有他自己，2.他比别人小，一定有len-1，3.比部分小，则也会有他
  for (let i = nLen - 2; i >= 0; i--) {
    // 只有遇到更大或者等于的值的时候拼接字符串并修改头节点
    if (nodeList[i].val >= res.val) {
      res = nodeList[i];
      res.next = now;
      now = res;
    }
  }
  return res;
}