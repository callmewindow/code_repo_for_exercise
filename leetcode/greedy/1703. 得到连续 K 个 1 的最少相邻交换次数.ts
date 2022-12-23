// https://leetcode.cn/problems/minimum-adjacent-swaps-for-k-consecutive-ones/
// 错误的简化方式，把连续1和连续0都进行了合并
// 此时不利于计算移动次数，错误
function minMoves(nums: number[], k: number): number {
  // 如果0或1连续，那么记录他们的长度n，只保留一个数，将问题简化
  let newN = [];
  const n = nums.length;
  // 对10000011，3可以简化为1-52，3
  let flag: number; // 判断当前连续的是0还是1
  let i = 0; // nums的脚标
  while (i < n) {
    flag = nums[i];
    if (flag) { // 1
      let cnt = 1;
      i++;
      while (nums[i] && i < n) cnt++, i++;
      // 此时i对应的是0
      newN.push(cnt); // 加入对应长度
    } else { // 0
      let cnt = 1;
      i++;
      while (!nums[i] && i < n) cnt++, i++;
      newN.push(-1 * cnt); // 负数代表间隔多少个0
    }
  }
  // 考虑到实际情况把开头末尾的0去除
  if (newN[0] < 0) newN.shift();
  if (newN[newN.length - 1] < 0) newN.pop();
  // console.log(newN); // 此时new一定是正负正负数交替，只需看怎么计算可以让正数之和最快等于k
  return 1;
};

// 正确的简化，统计连续0的数量，忽视1
// 基于0的数量便可计算出移动一个1到另一个1身边所需的步数
function getZeros(nums: number[]): number[] {
  const n = nums.length;
  let zeros = [];
  let i = 0;
  while (!nums[i] && i < n) i++; // 找到第一个1
  while (i < n) {
    let cnt = 0;
    i++; // 此时i位置是1，转移到1的下一个数
    while (!nums[i] && i < n) i++, cnt++; // 计算到下一个1之间的0数量
    zeros.push(cnt); // 记录数量
  }
  // 去除末尾的无意义0（不是两侧都是1，滑动窗口无法利用）
  // 统计数量时无论末尾有无0，都会zero中记录一个数，直接pop即可
  zeros.pop();
  return zeros;
}
function generateZeros(nums: number[]): number[] {
  const n = nums.length;
  let zeros: number[] = [], i = 0;
  while (i < n && nums[i] == 0) i++; // 找到第一个1
  while (i < n) {
    let j = i + 1; // 找到下一个1
    while (j < n && nums[j] == 0) j++;
    // 基于j可判断前面的循环结束是因为遇到1了还是因为到末尾了
    if (j < n) zeros.push(j - i - 1); // 记录两个1之间的0数量
    i = j; // 更新i始终为新的1
  }
  return zeros;
}
// 因为每次计算移动所需的次数，都是针对若干的0一起进行的，所以提前搭建前缀和便于使用
function generatePreSum(zeros: number[]): number[] {
  const m = zeros.length;
  let pre = new Array(m + 1);
  pre[0] = 0; // 首位是0，便于后续计算
  for (let i = 1; i <= m; i++) {
    pre[i] = pre[i - 1] + zeros[i - 1];
  }
  return pre;
}
// 基于开头结尾获取范围和的辅助函数
function getRangeSum(pre: number[], left: number, right: number): number {
  // 一般情况pre[i]记录的是脚标0加到脚标i的值，要left到right的值需right减去left-1
  // 如果left就是0则异常
  // pre多了前导0之后，pre[i]记录的是前i个数之和，即从脚标0加到脚标i-1
  // 所以得到脚标之间的范围值则需要统一+1，即调整为right+1减去left+1-1
  return pre[right + 1] - pre[left];
}
function minMoves(nums: number[], k: number): number {
  // 根据1 <= k <= sum(nums)，nums中一定有1存在
  let zeros = generateZeros(nums); //第1步：生成zeros
  let pre = generatePreSum(zeros); //第2步：生成移动次数的前缀和数组
  console.log(zeros, pre);

  let cost = 0; //第3步：cost记录每一个窗口的值第一个窗口的解
  // zeros记录的两个1之间的0数量，如果要k个1，需要k-1个zeros的数，脚标范围即i到i+k-2
  let left = 0, right = left + k - 2;
  for (let i = left; i <= right; i++) {
    cost += zeros[i] * (Math.min(i + 1, right - i + 1)); // 看移动长度需要基于脚标+1
    // 看这一批0向左还是向右移动花费更少
  }
  let minCost = cost; // min用于比较每一个窗口的话费

  // 第4步，开始滑动窗口寻找最小值
  let i = 1, j = i + k - 2; // 确保脚标差一直是k-2
  for (; j < zeros.length; i++, j++) {
    let mid = (i + j) >> 1; // 得到窗口中点，用于快速计算
    // 基于第一个消耗来快速得到新的小号
    cost -= getRangeSum(pre, i - 1, mid - 1); // 批量减去前半部分
    // 如果k-1是偶数，mid位置不需要改变；如果奇数，则mid需要改变，所以基于k判断
    cost += getRangeSum(pre, mid + (k % 2), j); // 批量加上后半部分
    minCost = Math.min(minCost, cost);
    // minCost = minCost > cost ? cost : minCost;
  }

  return minCost;
}