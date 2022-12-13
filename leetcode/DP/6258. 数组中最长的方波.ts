// https://leetcode.cn/problems/longest-square-streak-in-an-array/
// 朴素dp，从0开始找可以过
function longestSquareStreak(nums: number[]): number {
  nums.sort((b,f)=>b-f);
  // console.log(nums);
  const n = nums.length;
  let dp = Array(n).fill(1);
  for(let i = 1;i<n;i++){
    // 只有当是另一个值的平方时才会+1
    // 同时注意，平方的变化很大，一个数可能成为平方有且只有一个，所以从前找即可
    for(let j = 0;j<=i-1;j++){
      // 当已经不可能找到平方等于自己的了，平方大大于自己了，就停止
      const num = nums[j];
      if(num*num > nums[i]) break;
      else if(num*num == nums[i]){
        dp[i] = dp[j] + 1;
        break;
      }
    }
    // console.log(dp);
  }
  const res =  Math.max(...dp);
  return res == 1 ? -1 : res;
};

// 利用二分查找可能的平方数，直接大优化
function longestSquareStreak(nums: number[]): number {
  nums.sort((b, f) => b - f); // 直接排序后更好找，因为子序列也是调整顺序的
  const n = nums.length;
  let dp = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    // 只有当是另一个值的平方时才会+1
    // 同时注意，平方的变化很大，并且只有一个，因此使用二分查找
    let l = 0, r = i - 1, m = 0;
    while (l <= r) {
      m = (l + r) >> 1; // 找中点
      // console.log(l,r,m);
      const numPow = nums[m] * nums[m];
      if (numPow == nums[i]) {
        dp[i] = dp[m] + 1;
        break;
      }
      // 大于向左，小于向右
      if (numPow > nums[i]) r = m - 1;
      else l = m + 1;
    }
    // console.log(dp);
  }
  const res = Math.max(...dp);
  return res == 1 ? -1 : res; // 没有超过两个元素的则是-1
};
