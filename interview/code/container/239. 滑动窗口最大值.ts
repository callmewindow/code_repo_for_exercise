// https://leetcode.cn/problems/sliding-window-maximum/
// 滑动窗口单调队列记录最大值
function maxSlidingWindow(nums: number[], k: number): number[] {
  // 为了记录窗口中的最大值情况，使用索引进行记录，如果保存值可能重复
  const window: number[] = [];
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    // 如果目前的最大值即将离开窗口，则扔掉
    if (i - window[0] > k - 1) window.shift();
    // 此时window中有0～k-1个脚标，这些脚标是0～k-1中按顺序会出现的最大值
    // 为了判断新加入的i值是不是最大值，需要从后向前比较
    for (let j = window.length - 1; j >= 0; j--) {
      // 前面的值一定比后面的大，因此不需要担心异常
      if (nums[window[j]] <= nums[i]) window.pop();
    }
    // 此时window中的脚标对应的数一定大于i位置的数，或者为0
    window.push(i);
    // 根据窗口位置记录当前最大值
    if (i >= k - 1) res.push(nums[window[0]]);
  }
  return res;
};