// https://leetcode.cn/problems/merge-sorted-array/
// 减少了对原本数据的备份，超快
/**
 Do not return anything, modify nums1 in-place instead.
 */
 function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // 非递减，相等也可以
  // 直接在nums1中插入值即可，考虑到已经有了顺序，如果无脑放nums1后容易导致不必要的操作
  // 所以直接按照顺序进行插入排序即可
  // 为了快速的实现插入，利用寻找最大值的方法进行，这样可以不对前m个数进行备份
  let i1 = m-1, i2 = n-1, iRes = m+n-1; // 记录s1和s2中的最大值和当前插入数据的位置
  while (i1 >=0 || i2 >= 0) {
    const val1 = i1 >= 0 ? nums1[i1] : -1e10; // 不存在则假装最小值
    const val2 = i2 >= 0 ? nums2[i2] : -1e10;
    // 大的先放
    if (val1 > val2) {
      nums1[iRes--] = val1;
      i1--;
    } else {
      nums1[iRes--] = val2;
      i2--;
    }
  }
};