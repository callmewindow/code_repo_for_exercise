// https://leetcode.cn/problems/sort-an-array/
// 快排排序
function sortArray(nums: number[]): number[] {
  // 快排进行处理
  const n = nums.length;
  // 零或一个元素直接返回
  if (n <= 1) return nums;
  let pivot = Math.floor(Math.random() * n);
  // 以pivot值为基准进行左右数组的拆分
  const left: number[] = [], right: number[] = [];
  const mid: number[] = [];
  for (let i = 0; i < n; i++) {
    // 因为有重复元素，所以需要新增一个中间数组进行记录
    if (nums[i] < nums[pivot]) left.push(nums[i]);
    else if (nums[i] > nums[pivot]) right.push(nums[i]);
    else mid.push(nums[i]); // 专门统计相同的
  }
  // console.log(n, left.length, right.length);
  return [...sortArray(left), ...mid, ...sortArray(right)];
};

// 归并排序
function sortArray_1(nums: number[]): number[] {
  const n = nums.length;
  if (n < 2) return nums;
  return mergeSort(nums);
};
function mergeSort(nums: number[]): number[] {
  const n = nums.length;
  if (n <= 1) return nums;
  const mid = n >> 1; // 相当于floor/2
  // slice一个元素直接到最后
  return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid)));
}

function merge(arr1: number[], arr2: number[]): number[] {
  // 合并两个已排序数组
  const m = arr1.length, n = arr2.length;
  let i = 0, j = 0;
  const ans: number[] = [];
  while (i < m && j < n) {
    // 先放小的
    if (arr1[i] < arr2[j]) ans.push(arr1[i++]);
    else ans.push(arr2[j++]);
  }
  // 加入剩余的
  while (i < m) ans.push(arr1[i++]);
  while (j < n) ans.push(arr2[j++]);
  return ans;
};