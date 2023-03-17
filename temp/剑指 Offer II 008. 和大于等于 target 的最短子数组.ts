// https://leetcode.cn/problems/2VG8Kg/
function minSubArrayLen(target: number, nums: number[]): number {
  // 需要连续元素和大于等于tar

  // 首先看总和能否超过tar，不超过肯定找不到
  let sum = nums.reduce((f,b)=>f+b);
  const n = nums.length;
  if(sum < target) return 0;
  if(sum === target) return n; // 都是正整数，所以肯定是n

  // 处理大于的情况
  // 单纯的一个个统计不可能，因为要找最小的，所以从小的开始

  // 先一个长度，然后两个长度递增
  // 为了在计算多个长度的数时能利用之前的，每次都需要记录上一个长度在各个位置时的子数组之和
  // 即1，2，3，4，在统计3个的数组时，2的需要保存如下[0,3,5,7]，进而只需从第三个开始，然后加上第二个处两个元素时的值即可
  
};