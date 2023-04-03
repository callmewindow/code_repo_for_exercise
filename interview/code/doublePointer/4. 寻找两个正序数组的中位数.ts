// https://leetcode.cn/problems/median-of-two-sorted-arrays/
// 双指针简洁版
function findMedianSortedArrays(nums1: number[], nums2:number[]): number {
  const m = nums1.length, n = nums2.length;
  const len = m + n;
  const findLen = Math.floor(len / 2);
  // left和right记录偶数情况的左右
  let left = -1, right = -1;
  let i1 = 0, i2 = 0;
  // 要找中位数，所以只需要找前一半即可
  for (let i = 0; i <= findLen; i++) {
      // left记录right之前的值
      left = right;
      // 分情况更新right
      if ((i1 < m && i2 >= n) || nums1[i1] < nums2[i2]) {
          // 当i1没到末尾i2已经溢出，或者i1更小时找1
          right = nums1[i1++];
      } else {
          // 其他情况，即前文不满足的，例如i1末尾或者i2更小
          right = nums2[i2++];
      }
  }
  // & 1相当于%2，判断最后一位，0表示偶数
  return (len & 1) == 0 ? (left + right) / 2 : right;
}

// 二分版
function findMedianSortedArrays_1(nums1: number[], nums2: number[]): number {
  const n = nums1.length + nums2.length
  return (findK(nums1, nums2, n >> 1) + findK(nums1, nums2, (n - 1) >> 1)) / 2

  /**
   * @returns 寻找两个数组中第k小的数 k从0开始
   */
  function findK(nums1: number[], nums2: number[], k: number): number {
    if (nums1.length === 0) return nums2[k]
    if (nums2.length === 0) return nums1[k]
    const i1 = nums1.length >> 1
    const i2 = nums2.length >> 1
    const m1 = nums1[i1]
    const m2 = nums2[i2]

    if (i1 + i2 < k) {
      // 如果 num1 的一半 大于nums2的一半 那么 nums2 的前半部分不包含第k小的数候选
      if (m1 > m2) return findK(nums1, nums2.slice(i2 + 1), k - (i2 + 1))
      else return findK(nums1.slice(i1 + 1), nums2, k - (i1 + 1))
    } else {
      // 如果 num1 的一半 大于nums2的一半 那么 nums1 的后半部分不包含第k小的数候选
      if (m1 > m2) return findK(nums1.slice(0, i1), nums2, k)
      else return findK(nums1, nums2.slice(0, i2), k)
    }
  }
};