// https://leetcode.cn/problems/shortest-subarray-to-be-removed-to-make-array-sorted/
// 双指针，寻找符合情况的，从一个符合的为起点开始寻找
function findLengthOfShortestSubarray(arr: number[]): number {
  // 根据题意，需要找到一个i一个j
  // 满足0～i非递减，j～n非递减，且i<=j
  // 则只需初始化一个i和j，然后尝试缩短即可
  let j = arr.length - 1;
  // 寻找第一个可以拼接的位置，首先需确保j～n非递减
  while (j > 0 && arr[j - 1] <= arr[j]) j--;
  // 如果为0，说明都非递减，直接0
  if (j === 0) return 0;
  // 否则看最多少删除多少就可以非递增
  let minLen = j; // 记录删除的元素长度，从0到j-1
  // 开始找0～i非递减，且i<=j的
  for (let i = 0; i < arr.length; i++) {
    // 尝试将0～i拼接进j～n，所以j需要后移
    while (j < arr.length && arr[j] < arr[i]) j++;
    // 确保0～i递增的情况下后移
    minLen = Math.min(minLen, j - i - 1);
    // 然后判断下一个i还能不能确保0～i递增
    if (i + 1 < arr.length && arr[i] > arr[i + 1]) break;
  }
  return minLen;
};