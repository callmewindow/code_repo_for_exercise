// https://leetcode.cn/problems/median-of-two-sorted-arrays/
// 普通的双指针一步步走方法
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 都是递增，的只需要找出中位数的脚标，然后num1和num2一起走即可
  const len1 = nums1.length, len2 = nums2.length;
  const mid = (len1 + len2) >> 1; // 这里的mid为中位数或两个中位数中第二个的脚标
  // 奇数则直接找mid即可，偶数还需要记录mid-1，这里选择都保存，默认midNum的0是mid
  let midNum: number[] = [];
  // 记录双指针的脚标和当前遍历的数组
  // 因为要比较下一个，所以初始化为-1
  let i1 = -1, i2 = -1, numNow: number = 0;
  while (i1 < len1 && i2 < len2) {
    // 因为当i1+i2为0的时候，其实已经过了两个值，所以都需要+1才能和mid对应
    if (i1 + i2 + 1 == mid - 1 || i1 + i2 + 1 == mid) {
      console.log(mid, i1, nums1[i1], i2, nums2[i2], numNow)
      midNum.unshift(numNow == 1 ? nums1[i1] : nums2[i2]);
      if (i1 + i2 == mid) break;
    }
    // 处理已经到末尾的情况
    if (i1 == len1 - 1) {
      ++i2, numNow = 2;
      continue;
    }
    if (i2 == len2 - 1) {
      ++i1, numNow = 1;
      continue;
    }
    // 没到末尾则根据下一个的大小看切换到谁
    if (nums1[i1 + 1] <= nums2[i2 + 1]) ++i1, numNow = 1; // 1的小，1向后走
    else ++i2, numNow = 2; // 2小，2向后，注意切换now
  }
  // 奇数只返回mid0
  if ((len1 + len2) % 2 == 1) return midNum[0];
  else return (midNum[0] + midNum[1]) / 2;
};