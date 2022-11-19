// https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/
// 双指针实现O(n)逆转
function reversePrint(head: ListNode | null): number[] {
  if (!head) return [];
  // 最简单的就是全部读取然后数组转化为倒序，但是太暴力了
  // 比较优美的解法是记录下链表总长度，然后循环一次赋值给另一个数组，O(n)实现
  let arr: number[] = [];
  let listL = 0;
  while (head != null) {
    arr.push(head.val);
    listL++;
    head = head.next
  }
  // 耍赖使用函数，不是考察点
  // return arr.reverse()
  // let arrR = new Array(listL);
  let arrR: number[] = [];
  for (let i = 1; i <= listL; i++) {
    arrR.push(arr[listL - i]);
  }
  return arrR
};

// 递归实现，但是比较慢
let arrR: number[];
let listL: number;

function reversePrint_1(head: ListNode | null): number[] {
  if (!head) return [];
  // 用递归实现
  arrR = [];
  listL = 0;
  getNext(head, listL)
  return arrR
};

function getNext(head: ListNode | null, dep: number): void {
  if (!head) return;
  // 调用时dep即为当前为第几层，最终listL等于链表长度
  listL++;
  dep++;
  getNext(head.next, dep);
  // 如果倒序只需先调用再读值即可
  arrR[listL - dep] = head.val;
}

// 无全局变量的递归写法
function reversePrint_2(head: ListNode | null): number[] {
  // 用递归实现
  return getNext_1(head, []);
};

function getNext_1(head: ListNode | null, arrR: number[]): number[] {
  // 从空开始
  if (head == null) return [];
  // 直接获取下一个，轮流从第一个开始push即可
  arrR = getNext_1(head.next, arrR);
  arrR.push(head.val);
  return arrR
}