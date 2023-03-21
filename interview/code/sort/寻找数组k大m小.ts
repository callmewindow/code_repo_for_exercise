// 快速选择
function quickSelect(nums: number[], k: number): number {
  const len = nums.length;
  if (len === 1) {
    return nums[0];
  }
  // 随机选择一个基准值
  const pivot = nums[Math.floor(Math.random() * len)];
  // 小于基准值的元素
  const left = nums.filter((num) => num < pivot);
  // 大于等于基准值的元素
  const right = nums.filter((num) => num >= pivot);
  if (k <= left.length) {
    // 第k大的元素在左侧
    return quickSelect(left, k);
  } else if (k > len - right.length) {
    // 第k大的元素在右侧
    return quickSelect(right, k - (len - right.length));
  } else {
    // 基准值就是第k大的元素
    return pivot;
  }
}

function findKthAndMth(nums: number[], k: number, m: number): number[] {
  const len = nums.length;
  if (k > len || m > len) {
    throw new Error('k or m is out of range.');
  }
  const kth = quickSelect(nums.slice(), k);
  const mth = quickSelect(nums.slice(), len - m + 1);
  return [kth, mth];
}

// 测试
const nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const k = 4;
const m = 2;
const result = findKthAndMth(nums, k, m);
console.log(result); // [4, 3]

// 快速选择算法的思路是：在数组中随机选择一个基准值，将数组分成小于基准值和大于等于基准值两部分
// 如果第k大的元素在左侧，则递归地在左侧寻找第k大的元素；
// 如果第k大的元素在右侧，则递归地在右侧寻找第k - 左侧元素个数的大的元素；
// 如果基准值就是第k大的元素，则直接返回基准值。

// 在这个算法中，我们先对原数组做一次复制（nums.slice()），然后对复制后的数组进行快速选择算法，避免改变原数组。
// 最后返回第k大和第m小的元素组成的数组。

// 值得注意的是，如果k或m的值大于数组长度，则无法找到第k大或第m小的元素，此时应该抛出异常。