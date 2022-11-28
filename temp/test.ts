function countSubarrays(nums: number[], k: number): number {

  // 看似是一个全排列，其实不是，因为找中位数也是要基于递增顺序的
  // 所以只需要基于要寻找的中位数，找出在左侧和右侧取出相同数量数的情况乘积
  // 但因为是连续的，所以不需要找情况，直接基于4向两侧延伸，看大于小于的数量即可，使用dp
  // 只有当数组中存在k，小于的是n，大于的是m，当n+m+1奇数，n应该=m，当偶数，m=n+1
  let res = 0;
  const nLen = nums.length;
  // 嵌套循环太花时间
  // 对一些特殊情况做处理：
  // 如果k是nums中的最大值，一定是1
  if(k == nLen+1) return 1;
  // 如果k是最小值1，则一定是3，一个自己，一个自己加一个大的
  if(k == 1) return 3;

  // dp来保存从脚标0到当前位置，大于k的数量，则小于k的数量就等于脚标+1-大于k的数量，如果脚标超过了kI，还需要再减1
  let dp = Array(nLen + 1).fill(0);
  let kI = 0;
  // 初始化0
  dp[0] = 0; // 表示一开始是全0，此时没有nums的数
  // 从1开始dp
  for (let i = 1; i <= nLen; i++) {
    const tmp = dp[i - 1];
    if (nums[i - 1] == k) {
      kI = i - 1; // 这里注意真正的脚标要-1
      dp[i] = tmp;
    } else {
      dp[i] = nums[i - 1] > k ? tmp + 1 : tmp;
    }
    // console.log(dp);
  }
  // console.log(kI);
  // 进而至于左侧从kI到1，右侧从kI到nLen-1，分别遍历看k是否是中位数
  // 注意dp比nums的脚标多1，所以实际的脚标应该是kI+1，最大长度也应该是nLen+1

  // 这里注意不需要全遍历，根据k和nLen-1的关系，调整的范围是有限制的
  // 例如当k等于n，那么范围就是0，因为只要多于1个数，就不会符合情况
  // 如果k等于n-1，范围就是1，即只有当连续子数组长度小于等于3，自己才有可能
  const range = nLen + 1 - k;
  for (let i = kI + 1; i >= kI + 1 - range && i >= 1; i--) {
    for (let j = kI + 1; j <= kI + 1 + range && j <= nLen; j++) {
      // 分别计算ij区间小于和大于k的数量
      // 小于的，因为j一定大于等于kI+1，所以直接前面把k减掉1即可
      const n = (j - dp[j] - 1) - (i - 1 - dp[i - 1]); // 因为dp是包含自身的，因此减的时候要减前一个
      // 大于的
      const m = dp[j] - dp[i - 1];
      // console.log(n,m)
      // 看是否满足情况，满足+，不满足继续循环
      if ((n + m + 1) % 2 == 1) {
        if (m == n) res++;
      } else {
        if (m == n + 1) res++;
      }
    }
  }
  return res;
};