// https://leetcode.cn/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/
// bfs分层存储，map记录索引实现最小交换次数的判断
// 该方法会更新node的位置，实现真正的交换节点
function checkSwapCnt_node(nodes: TreeNode[], nums: number[]): [TreeNode[], number] {
  let cnt = 0;
  if (nums.length <= 1) return [nodes, cnt];
  let sortNums = nums.concat([]).sort();
  let numL = nums.length;
  // 记录最终排序索引，但是map默认只会记录num最后一次出现的位置，无法处理重复数字的情况，本题目不重复所以还可以
  let nMap = new Map();
  for (let i = 0; i < numL; i++) nMap.set(sortNums[i], i);
  // 如果重复的话，需要利用一个数组记录各个字符出现的次数
  let nCnt = new Array(nMap.size).fill(0)
    .map((_, i) => {
      if (i == 0) return nMap.get(sortNums[i]) + 1;
      else return nMap.get(sortNums[i]) - nMap.get(sortNums[i - 1]);
    });
  console.log(nMap);
  console.log(nCnt);
  for (let i = 0; i < numL; i++) {
    if (nums[i] == sortNums[i]) continue;
    // 交换数值和节点
    let tmp = nums[i];
    let tmpN = nodes[i];
    let newI = nMap.get(tmp);

    nums[i] = nums[newI];
    nums[newI] = tmp;

    nodes[i] = nodes[newI];
    nodes[newI] = tmpN;

    cnt++;
  }
  return [nodes, cnt];
}

// 正常的检查交换数量
function checkSwapCnt(nums: number[]): number {
  let cnt = 0;
  if (nums.length <= 1) return cnt;
  let numL = nums.length;
  // 从小到大排序，默认是按内容的字典序，即10会放在9前面，需要自定义
  let sortNums = nums.concat([]).sort((b, f) => b - f);
  // console.log(nums, sortNums)
  // 记录最终排序索引
  let nMap = new Map();
  for (let i = 0; i < numL; i++) nMap.set(sortNums[i], i);
  // document可以不输出空格
  // window.document.write(nums.toString());
  // 使用交换方法需要了解，因为i是向前走的，因此如果不管i一直向前，每次交换后不会判断当前i是否符合顺序，因此可能会出现排序失败的情况
  // 例如[347,167,383,422,493,489,275,72,425,89]
  // 此时会出现先把最大值转移到最前面，然后后面再把最大值换到中间，从而无法读到最大值并将其转到对应位置
  for (let i = 0; i < numL; i++) {
    // console.log(nums.toString(), '\n', sortNums.toString());
    // console.log(i, nums[i], sortNums[i]);
    // 解决方法1，此处用while，直到i满足要求
    if (nums[i] == sortNums[i]) continue;
    cnt++;
    // 交换数值
    let newI = nMap.get(nums[i]);
    [nums[i], nums[newI]] = [nums[newI], nums[i]];
    // 解决方法2，i--，使下次循环还是i
    i--;
  }
  // console.log(nums, cnt)
  return cnt;
}
function minimumOperations(root: TreeNode | null): number {
  if (!root) return 0;
  // 分层bfs，记录总节点和下一层的节点
  let nodeQ: TreeNode[] = [], tmpQ: TreeNode[] = [];
  let tmpV: number[] = [];
  let swapCnt = 0, cnt = 0;
  nodeQ.push(root);
  while (nodeQ.length != 0) {
    // 注意在定义数组时，如果= = []，此时前者会指向后者的索引，无法正常初始化，需要分开
    tmpV = [], tmpQ = [];
    // 基于当前队列长度遍历，不能直接for of，因为nodeQ新增值后还会再继续遍历
    for (let _ of Array(nodeQ.length)) {
      const tmpN = nodeQ.shift();
      tmpQ.push(tmpN);
      tmpV.push(tmpN.val);
    }
    // 注意在将数组作为参数传入函数时，函数中对数组做的操作也会同步回来，因为传的是索引，修改的内存是相同的
    // console.log(tmpV);
    // [tmpQ,cnt] = checkSwapCnt_node(tmpQ,tmpV);
    cnt = checkSwapCnt(tmpV);
    swapCnt += cnt;
    // 遍历下一层子节点，貌似不用修改子节点，草，白写了
    while (tmpQ.length > 0) {
      const tmpN = tmpQ.shift();
      if (tmpN.left != null) nodeQ.push(tmpN.left);
      if (tmpN.right != null) nodeQ.push(tmpN.right);
    }
    // console.log(tmpV, nodeQ);
  }
  return swapCnt;
};