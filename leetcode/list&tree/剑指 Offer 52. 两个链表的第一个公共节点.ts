// https://leetcode.cn/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof
// 看错题意，以为是找第一个相同数值的节点
var getIntersectionNode = function (headA, headB) {
  // 最佳情况：n复杂度则需要一次遍历解决，，1空间则不能新建别的变量
  // 普通解决：同时遍历完两个，然后从末尾判断，记录到公共节点的skip，时间为n，空间也为n
  // 如果有一个是null则不可能有公共
  if (headA == null || headB == null) return null;
  let arrA = [], arrB = [];
  let hTmp = headA;
  let skipA = 0;
  while (headA != null) {
    arrA.push(headA.val)
    headA = headA.next;
  }
  while (headB != null) {
    arrB.push(headB.val)
    headB = headB.next;
  }
  let lA = arrA.length, lB = arrB.length;
  // 如果末尾不相同，则不存在公共节点
  if (arrA[lA - 1] != arrB[lB - 1]) return null;
  // 否则末尾开始遍历
  for (let i = 1; i <= lA && i <= lB; i++) {
    // 不相等时表示lA-i+1的位置是第一个公共
    if (arrA[lA - i] != arrB[lB - 1])
      skipA = lA - i + 1;
  }
  console.log(skipA);
  // 基于tmp调整到公共节点
  while (skipA > 0) {
    hTmp = hTmp.next;
    skipA--;
  }
  return hTmp;
};

// n2时间解决，硬遍历
var getIntersectionNode_1 = function (headA, headB) {
  // 链表和数组不同，节点是一个指向的关系，如果是同一个节点，则存储是相同的
  // 如果出现了公共节点，就应该是可以直接判断相等的，即可以=
  // 普通方法即两轮遍历
  // 备份b
  let bpB = headB;
  while (headA != null) {
    headB = bpB;
    while (headB != null) {
      // 出现公共则返回
      if (headA == headB) return headA;
      headB = headB.next;
    }
    headA = headA.next;
  }
  // 没有就是null
  return null;
};

// 数组存储，两次遍历的时间解决
var getIntersectionNode_2 = function (headA, headB) {
  // 链表和数组不同，节点是一个指向的关系，如果是同一个节点，则存储是相同的
  // 如果出现了公共节点，就应该是可以直接判断相等的，即可以=
  // 如果n时间复杂度，可利用数组存储A的节点然后比较
  let nodeA = []
  while (headA != null) {
    nodeA.push(headA);
    headA = headA.next;
  }
  // 然后判断B的节点什么时候出现在A的节点中即可
  while (headB != null) {
    if (nodeA.includes(headB)) return headB;
    headB = headB.next;
  }
  return null;
};

// set判断是否存在更快，可以o(1)判断是否有
var getIntersectionNode_3 = function (headA, headB) {
  let nodeA: Set<Node> = new Set()
  while (headA != null) {
    nodeA.add(headA);
    headA = headA.next;
  }
  while (headB != null) {
    if (nodeA.has(headB)) return headB;
    headB = headB.next;
  }
  return null;
};
