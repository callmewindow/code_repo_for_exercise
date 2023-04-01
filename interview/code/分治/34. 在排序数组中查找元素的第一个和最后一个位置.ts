// https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
// 手写二分，注意脚标位置
function searchRange(nums: number[], target: number): number[]{
  // 最朴素就是一次循环，但是不够快，而且是0N复杂度
  // log N，因此需要二分
  const n = nums.length;
  const res: number[] = [];
  let left, right, mid;
  // 先找最左侧
  left = 0, right = n - 1;
  while(left <= right){
      mid = (left + right) >> 1;
      // console.log(left, right, mid);
      // 即使相等也向左
      if(nums[mid] >= target) right = mid - 1;
      else left = mid + 1;
  }
  // 最后一定是right在第一个target的左侧，left恰好是第一个
  // 如果left不是，则说明没找到，直接-1-1
  if(nums[left] === target) res[0] = left;
  else return [-1,-1];
  left = 0, right = n - 1;
  while(left <= right){
      mid = (left + right) >> 1;
      // 即使相等也向右
      if(nums[mid] > target) right = mid - 1;
      else left = mid + 1;
  }
  // 最后一定是left在最后一个tar的右侧，right恰好是最后一个
  res[1] = right;
  return res;
}

// index和last果然是二分
function searchRange_1(nums: number[], target: number): number[] {
  return [nums.indexOf(target), nums.lastIndexOf(target)];
};