// https://leetcode.cn/problems/find-the-maximum-number-of-marked-indices/
// 二分寻找可能的数字，可能错过一些情况
function maxNumOfMarkedIndices(nums: number[]): number {
  // 为了确保找到最多标记的，需要尽可能满足更多可能
  // 针对 11，2，5，6，便不能选择2，5搭配，而是11和5，2和6
  // 因此首先对nums排序，从最大的开始找
  nums.sort((b, f) => f - b);
  // console.log(nums);
  const n = nums.length;
  let visit = new Array(n).fill(0);
  let numI: number, numJ: number;
  // i到n-1已经没意义了
  for (let i = 0; i < n - 1; i++) {
    if(visit[i]) continue;
    numJ = nums[i];
    // 寻找numI小于等于numJ/2
    numI = numJ / 2;
    // 如果需要的numI太小，则直接跳过后续的所有寻找（因为只会越来越小）
    if (numI < nums[n - 1]) break;
    // 利用二分寻找
    let left = i + 1, right = n - 1, mid = 0;
    while (left <= right) {
      mid = (left + right) >> 1;
      // console.log(left, mid, right);
      // console.log(nums[left], nums[mid], nums[right]);
      // 需要找到小于等于numI的
      if (nums[mid] == numI) {
        left = mid;
        right = left - 1;
      } else {
        if (nums[mid] > numI) left = mid + 1; // 尽可能寻找大的
        else right = mid - 1;
      }
    }
    // console.log("find:", left, mid, right);
    if (visit[left] <= numI) {
      while (visit[left] && left < n) {
        // 当对应位置已经被标记过，则循环找第一个没有被标记的
        left++;
      }
      if (left < n) visit[left] = 1, visit[i] = 1;
      // console.log(nums[left], nums[i]);
    }
  }
  return visit.filter((v) => v == 1).length;
};

// 二分答案找匹配数对，贪心尽可能利用数字情况
function maxNumOfMarkedIndices_1(nums: number[]): number {
  nums.sort((b, f) => b - f);
  // console.log(nums);
  const n = nums.length;
  // left表示最少匹配数量0，right记录最多匹配数量+1
  // 位运算优先级低于加减乘除
  let left = 0, right = (n >> 1) + 1;  // 开区间
  // console.log(left, right)
  while (left + 1 < right) {
    const k = (left + right) >> 1;
    // console.log(k);
    let hasK = true;
    // 看是否有k个匹配对
    for (let i = 0; i < k; i++) {
      // 如果有k个则前k一定和后k匹配，顺序都是从前向后，所以i和n-k+i对应
      // 这里是贪心思想
      if (nums[i] * 2 > nums[n - k + i]) {
        // 不匹配则直接退出
        hasK = false;
        break;
      }
    }
    // console.log(hasK);
    // 有k个继续找更大，否则找更小
    if (hasK) left = k;
    else right = k;
  }
  return left * 2;
};