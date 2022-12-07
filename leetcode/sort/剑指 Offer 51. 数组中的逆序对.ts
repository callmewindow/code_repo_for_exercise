// https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/
// 归并排序来统计逆序的数量
//利用归并排序解答，在合并的时候，当左边的大于右边，就计算逆序数。
//计算公式； mid-left+1
function reversePairs(nums: number[]): number {
  return mergeSort(nums, 0, nums.length - 1);
}
function mergeSort(nums: number[], left: number, right: number) {
  //当只有一个节点的时候，直接返回，退出递归
  if (left >= right) return 0;
  let mid = (left + right) >> 1; // 按中间拆分，注意右移1是除以2
  // console.log(left, mid, right);
  let leftPairs = mergeSort(nums, left, mid);
  let rightPairs = mergeSort(nums, mid + 1, right);
  let mergePaires = merge(nums, left, mid, right);
  return leftPairs + rightPairs + mergePaires;
}
function merge(nums: number[], left: number, mid: number, right: number): number {
  //定义一个临时数组来进行合并，长度即left和right之间的元素数量
  let temp = new Array(right - left + 1);
  //定义指针，指向左、右和合并数组的第一个元素
  let i = left, j = mid + 1, t = 0;
  // 定义计数，统计合并过程中发现的逆序对数量
  let cnt = 0;
  //当两个数组都有元素的时候，遍历比较每个元素大小
  while (i <= mid && j <= right) {
    //比较两个数组的元素，取较小的元素加入到，临时数组中
    //并将两个指针指向下一个元素
    if (nums[i] <= nums[j]) {
      temp[t++] = nums[i++]; // 不是逆序对直接前进
    } else {
      //当左边数组的大与右边数组的元素时，就对当前元素以及后面的元素的个数进行统计，
      //此时这个数就是，逆序数，记下每次合并中存在的逆序数。
      cnt += mid - i + 1; // i此时为逆序的元素，因此i到mid之间都会产生逆序对
      temp[t++] = nums[j++];
    }
  }
  //当数组没有遍历完成，直接将剩余元素加入到合并数组中
  while (i <= mid) temp[t++] = nums[i++];
  while (j <= right) temp[t++] = nums[j++];
  //将新数组中的元素，覆盖nums旧数组中的元素。
  //此时数组的元素已经是有序的
  for (let k = 0; k < temp.length; k++) {
    nums[left + k] = temp[k];
  }
  return cnt;
}