// 给定一个数组 nums，有一个大小为 k 的滑动窗口，从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口中的k个数字。滑动窗口每次只向右移动一位，求返回滑动窗口最大值
// 输入： nums: [1,3,-1,-3,5,3,6,7]； k: 3
// 输出： [3, 3, 5, 5, 6, 7]
/**
 * 求解滑动窗口的最大值
 * @param nums 数组
 * @param k 窗口大小
 * @returns 窗口中的最大值数组
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  // window 存储当前窗口中数据的下标
  const window: number[] = [];
  // result 存储窗口中的最大值
  const result: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    if (i - window[0] > k - 1) {
      // 剔除窗口长度超出范围时左侧的最大值
      window.shift();
    }
    for (let j = window.length - 1; j >= 0; j--) {
      // 当前窗口的值依次和要插入的值做比较，如果小于要插入的值，剔除掉该值，直到 window 为空为止
      // （保证 window 中最左侧的值为最大值）
      // 因为window只是一个临时保存当前窗口最大值的方法，如果新增的是最大值，那么保留之前比他小的值也没有意义
      if (nums[window[j]] <= nums[i]) {
        window.pop();
      }
    }
    // 添加右侧新加入的值，插入新值时有两种情况：
    // 1、新值为最大值时，则 window 此时为空；
    // 2、新值不为最大值时，window 已剔除掉比新值小的值
    window.push(i);
    if (i >= k - 1) {
      // 窗口是从 0 开始移动，当移动的距离大于等于目标范围后，以后再往后移动一次，就要写入当前窗口的最大值
      result.push(nums[window[0]]);
    }
  }
  
  return result;
}
