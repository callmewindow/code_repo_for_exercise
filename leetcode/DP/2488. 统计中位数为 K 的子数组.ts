// https://leetcode.cn/problems/count-subarrays-with-median-k/
// dp统计区间内大于小于的值，进而中心扩散判断
// 超时了
function countSubarrays(nums: number[], k: number): number {
  // 看似是一个全排列，其实不是，因为找中位数也是要基于递增顺序的
  // 所以只需要基于要寻找的中位数，找出在左侧和右侧取出相同数量数的情况乘积
  // 但因为是连续的，所以不需要找情况，直接基于4向两侧延伸，看大于小于的数量即可，使用dp
  // 只有当数组中存在k，小于的是n，大于的是m，当n+m+1奇数，n应该=m，当偶数，m=n+1
  let res = 0;
  const nLen = nums.length;
  // dp来保存从脚标0到当前位置，小于和大于k的数量
  let dp = Array(nLen + 1).fill(0).map((_) => Array(2));
  let kI = 0;
  // 初始化0
  dp[0] = [0, 0]; // 表示一开始是全0，此时没有nums的数
  // 从1开始dp
  for (let i = 1; i <= nLen; i++) {
    const tmp = dp[i - 1];
    if (nums[i - 1] == k) {
      kI = i - 1; // 这里注意真正的脚标要-1
      dp[i] = tmp;
    } else {
      dp[i] = nums[i - 1] < k ? [tmp[0] + 1, tmp[1]] : [tmp[0], tmp[1] + 1];
    }
    // console.log(dp);
  }
  // console.log(kI);
  // 进而至于左侧从kI到1，右侧从kI到nLen-1，分别遍历看k是否是中位数
  // 注意dp比nums的脚标多1，所以实际的脚标应该是kI+1，最大长度也应该是nLen+1
  for (let i = kI + 1; i >= 1; i--) {
    for (let j = kI + 1; j <= nLen; j++) {
      // 分别计算ij区间小于和大于k的数量
      // 小于的
      const n = dp[j][0] - dp[i - 1][0]; // 因为dp是包含自身的，因此减的时候要减前一个
      // 大于的
      const m = dp[j][1] - dp[i - 1][1];
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

// 优化dp为值记录大于k的值，并根据k的大小判断可能扩散的范围
// 最坏情况仍然超时
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
  if (k == nLen) return 1;
  // 如果k是最小值1，则长度大于等于3时是3，否则等于数组长度
  if (k == 1) return nLen >= 3 ? 3 : nLen;

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
  const range = 2 * (nLen - k); // 这个range是不算k本身周围可以出现的数量，所以需要*2
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


// 再次优化，在初始化dp时便进基于需要的范围去处理
// 但还是最坏情况On2，最后一个超时
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
  if (k == nLen) return 1;
  // 如果k是最小值1，则长度大于等于3时是3，否则等于数组长度
  if (k == 1) return nLen >= 3 ? 3 : nLen;

  // 这里注意不需要全遍历，根据k和nLen-1的关系，调整的范围是有限制的
  // 例如当k等于n，那么范围就是0，因为只要多于1个数，就不会符合情况，同理的还有k=1时，范围就是1，因此需要对比两侧来确定范围
  // 如果k等于n-1，范围就是1，即只有当连续子数组长度小于等于3，自己才有可能
  const range = 2 * (nLen - k > k ? k : nLen - k); // 这个range是不算k本身周围可以出现的数量，所以需要*2

  // dp来保存从脚标0到当前位置，大于k的数量，则小于k的数量就等于脚标+1-大于k的数量，如果脚标超过了kI，还需要再减1
  let dp = Array(nLen + 1).fill(0);
  let kI = 0;
  while (nums[kI] != k) kI++;
  // 初始化0
  const left: number = kI + 1 - range >= 1 ? kI + 1 - range : 1;
  const right: number = kI + 1 + range <= nLen ? kI + 1 + range : nLen; // 右边最大需要的范围
  dp[left - 1] = 0; // 从左range左边部分开始初始化
  // 从1开始dp
  for (let i = left; i <= right; i++) {
    const tmp = dp[i - 1];
    if (nums[i - 1] == k) dp[i] = tmp;
    else dp[i] = nums[i - 1] > k ? tmp + 1 : tmp;
    // console.log(dp);
  }
  // console.log(kI);
  // 进而至于左侧从kI到1，右侧从kI到nLen-1，分别遍历看k是否是中位数
  // 注意dp比nums的脚标多1，所以实际的脚标应该是kI+1，最大长度也应该是nLen+1

  for (let i = kI + 1; i >= left; i--) {
    // 注意j这里的范围多大是取决于前面使用了多少元素的，需要基于i调整后面最多遍历到多长
    // 前面使用了1，后面就少1，前面使用了range-1，后面只看1即可
    const rangeRight = range - (kI + 1 - i);
    for (let j = kI + 1; j <= kI + 1 + rangeRight && j <= nLen; j++) {
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

// 正确解法：因为已经记录了k之前各个位置前所有数大于k的数量
// 可以考虑用map进行记录，即记录某个数量时，k之前的连续数组有多少个满足的情况
// 比较费脑子了
// 简单来说，不要浪费现有资源
function countSubarrays(nums: number[], k: number): number {
  const n = nums.length;
  let kI = 0; // 记录k的位置
  for (let i = 0; i < n; ++i)
    if (k == nums[i]) {
      kI = i;
      break;
    }

  // 将nums的值转化为1、-1和0，便于后续计算
  // 注意let of的方法是只读的，无法修改值
  // for (let x of nums) {
  //   if (x > k) x = 1;
  //   else if (x < k) x = -1;
  // }
  nums = nums.map((x) => x > k ? 1 : -1); // map不会修改原本数组
  nums[kI] = 0;
  // console.log(nums);

  let dp: number[] = Array(n + 1); // 记录个位置大于小于的情况
  dp[0] = 0;
  for (let i = 1; i <= n; ++i) dp[i] = dp[i - 1] + nums[i - 1];

  let oddCnt = new Map(), evenCnt = new Map();
  // 处理k之前的值，注意dp比num多一位，所以kI其实是kI前一位数
  for (let i = 0; i <= kI; ++i) {
    // 通过&1可判断最后一位是否是1，是1则是奇数，是0则是偶数
    const x = dp[kI] - dp[i];
    // 注意js的map使用比较复杂，需要先get获取旧值再去更新
    const oddX = oddCnt.get(x), evenX = evenCnt.get(x);
    // 用ho记录奇数情况下0～kI之间大于k的各数量出现的次数
    // 例如ho[1] = 3就是在0～kI的若干连续子数组中，大于k的数量比小于k的数量多了1的情况有三种
    if (i & 1) oddCnt.set(x, oddX == undefined ? 1 : oddX + 1);
    else evenCnt.set(x, evenX == undefined ? 1 : evenX + 1); // he同理记录偶数情况
  }

  let res = 0;
  // 预处理k之前的开始处理k之后的
  for (let i = kI; i < n; ++i) {
    // 这里i+1是dp中i对应位置的数量，从kI开始
    const x = dp[i + 1] - dp[kI]; // x用来记录kI到i+1之间大于k的情况
    const x0 = 0 - x, x1 = 1 - x;
    // 如果 i 是奇数，则与其长度为奇数的子数组的左端下标是奇数(0 - x)，即表示在左侧应该有-x个大于k的值，即x个小于k的值
    // 与其长度为偶数的子数组的左端下标是偶数，因为偶数时需要让k位于左侧，所以大于的要多一个，即左侧的应该少一个，所以是1-x
    if (i & 1) {
      res += oddCnt.get(x0) == undefined ? 0 : oddCnt.get(x0); // 两个奇数脚标之间有奇数个值
      res += evenCnt.get(x1) == undefined ? 0 : evenCnt.get(x1);
    } else {
      // 如果 i 是偶数，则与其长度为奇数的子数组的左端下标是偶数(0 - x)，与其长度为偶数的子数组的左端下标是奇数
      res += evenCnt.get(x0) == undefined ? 0 : evenCnt.get(x0); // 两个偶数脚标之间也有奇数个值
      res += oddCnt.get(x1) == undefined ? 0 : oddCnt.get(x1);
    }
  }

  return res;
}