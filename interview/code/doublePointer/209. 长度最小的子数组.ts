// https://leetcode.cn/problems/minimum-size-subarray-sum/
// 维护滑动数组，根据sum和tar关系来更新min
function minSubArrayLen(target: number, nums: number[]): number {
  // 需要连续子数组，滑动窗口
  // 维护一个滑动窗口，记录窗口左右和总值，当没有大于tar一直延伸
  // 大于之后每次新增值都删除之前的值直到仍然满足大于的情况
  const n = nums.length;
  let left = 0, right = 0;
  let sum = 0;
  // 找到右边界
  while (sum < target && right < n) sum += nums[right++];
  // 此时right位于下一个字符位置，所以不需要+1
  let minLen = right - left;

  // 如果是遍历全部才符合，这里做一些处理，以适配统一流程
  // == n时进行收缩处理，避免特殊情况的遗漏，例如11 1，2，3，4，5
  if(right == n) right--, sum -= nums[right];

  // console.log(right,left, minLen);
  let delSum = 0;
  for (; right < n; right++) {
    sum += nums[right];
    // 更新右边界
    delSum = 0;
    // 判断左侧需要删除多少
    while (sum - delSum >= target) delSum += nums[left++];
    // 此时left会多一个，需要-1才是正确位置
    left--;
    sum = sum - delSum + nums[left]; // 更新sum
    // console.log(delSum);
    // console.log(left,right);
    // console.log(sum);
    // 更新min
    minLen = minLen > right - left + 1 ? right - left + 1 : minLen;
  }
  // 可能无法满足
  return sum >= target ? minLen : 0;
};