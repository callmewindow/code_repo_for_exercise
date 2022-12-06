// https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/
// 使用栈保存最大值的方式来记录，差点超时
function maxSlidingWindow(nums: number[], k: number): number[] {
  // 用一个队列来记录滑动窗口中的最大值
  let maxQueue: number[] = [];
  for (let i = 0; i < k; i++) {
    // 每次有新值都去除小于自己的值，只push当前值
    while (
      maxQueue.length > 0 &&
      maxQueue[maxQueue.length - 1] < nums[i]
    ) maxQueue.pop();
    maxQueue.push(nums[i]);
  }
  console.log(maxQueue);
  let res = [maxQueue[0]]; // 增加第一部分的最大值
  for (let i = k; i < nums.length; i++) {
    // 判断剔除的数是否是最大值，是的话也需要同步操作max
    if (nums[i - k] == maxQueue[0]) maxQueue.shift();
    // 将num k放入max中进行计算
    while (
      maxQueue.length > 0 &&
      maxQueue[maxQueue.length - 1] < nums[i]
    ) maxQueue.pop();
    maxQueue.push(nums[i]);
    res.push(maxQueue[0]);
  }
  return res;
};

// 直接强行从头寻找窗口最大值来形成数组，果然超时
function maxSlidingWindow_1(nums: number[], k: number): number[] {
  const { max } = Math;
  let res: number[] = [];
  res.push(max(...nums.slice(0, k))); // 直接寻找最大值
  for (let i = 1; i <= nums.length - k; i++) {
    res.push(max(...nums.slice(i, k + i)));
  }
  return res;
};

// 搭建一个排列最大值的数组，不断调整他的值，每次都是从头排序，很难不超时
function maxSlidingWindow_2(nums: number[], k: number): number[] {
  let res: number[] = [];
  let maxQueue = nums.slice(0, k).sort((b, f) => f - b); // 从大到小排列
  res.push(maxQueue[0]);
  for (let i = k; i < nums.length; i++) {
    // maxQueue[maxQueue.indexOf(nums[i-k])] = -Infinity; // 剔除第一个值
    maxQueue.splice(maxQueue.indexOf(nums[i - k]), 1); // 剔除第一个值
    maxQueue.push(nums[i]); // 增加新值
    maxQueue.sort((b, f) => f - b); // 排序确保最大的在最前面
    // console.log(maxQueue)
    res.push(maxQueue[0]);
  }
  return res;
};