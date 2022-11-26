// https://leetcode.cn/problems/partition-list-lcci/
// 先遍历并保存和x关系，然后根据关系替换值即可
function partition(head: ListNode | null, x: number): ListNode | null {
  // 最简单的方法是冒泡，但是很慢
  // 使用快排的思路，先遍历一遍存储节点
  let nodeList: ListNode[] = [head];
  let checkList: boolean[] = [];
  while(head != null){
    // 此时head一定不是null
    checkList.push(head.val >= x); // 大于等于就是true
    nodeList.push(head.next); // 存一个null在末尾，该null没有对应的check
    head = head.next;
  }
  // 根据题意可知，需要尽量小的修改，只需找到true的时候，在后面找一个false的替换即可
  for(let i = 0;i<checkList.length;i++){
    if(checkList[i]){
      let newI = checkList.lastIndexOf(false); // 这里找的是最后一个false
      // 如果false在true前就不调整
      if(newI < i) continue;
      // 否则需要调整，包括true，false和值
      [checkList[i],checkList[newI]] = [checkList[newI],checkList[i]];
      // 没有要求通过调整引用的方式来替换，所以直接修改值
      [nodeList[i].val, nodeList[newI].val] = [nodeList[newI].val, nodeList[i].val]
      // // 注意节点都是索引，这里tmp不应保留node，而是保存
      // const tmp = nodeList[i];
      // // 修改当前内容和next

      // nodeList[i].next = nodeList[newI].next;
      // nodeList[i].val = nodeList[newI].val;
      // nodeList[i-1].next = nodeList[newI];
    }
  }
  return nodeList[0];
};

// 不使用checkList，减少内存占用，优化代码逻辑
function partition_1(head: ListNode | null, x: number): ListNode | null {
  if(!head) return null;
  // 最简单的方法是冒泡，但是很慢
  // 使用快排的思路，先遍历一遍存储节点
  let nodeList: ListNode[] = [];
  while(head != null){
    // 不保存null
    nodeList.push(head);
    head = head.next;
  }
  // 根据题意可知，需要尽量小的修改，只需找到大于等于时，替换掉一个小于的
  // 注意最后一个节点是null，
  for(let i = 0;i<nodeList.length;i++){
    if(nodeList[i].val >= x){
      // 为确保一次交换解决，找最后一个小于x的
      let newI: number = nodeList.length-1;
      // i之前的不用找，符合要求
      for(;newI>i;newI--) if(nodeList[newI].val < x) break;
      // 如果循环结束，没有不符合条件的则不调整
      if(newI == i) continue;
      // 否则需要调整，因为没有要求通过调整引用的方式来替换，所以直接修改值
      [nodeList[i].val, nodeList[newI].val] = [nodeList[newI].val, nodeList[i].val]
      // // 如果要修改节点，当需要保存原本的值时要注意节点都是索引，这里tmp不应保留node，而是保存具体的val和next
      // // 否则在后面对nodeList[i]修改时，tmp也会被修改
      // const tmp = nodeList[i];
    }
  }
  return nodeList[0];
};