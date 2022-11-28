// https://leetcode.cn/problems/largest-sum-of-averages/
// 直接硬动态，最坏情况就是n3，但是也只能这样
function largestSumOfAverages(nums: number[], k: number): number {
  // 因为是连续分，所以不能排序后再做处理
  // 首先需要学会如何给予k把n分成k份，基于这个方法才能去做其他工作
  // 但其实也不用考虑如何划分几份，只需要动态规划的时候硬处理即可
  // 因为两个数，分开肯定比部分要大，所以不断动态规划找即可
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0); // 记录前缀和，用于后续初始化dp数组
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i]; // 多初始化一位可以不用专门初始化第一位
  const dp = new Array(n + 1).fill(0).map(() => new Array(k + 1).fill(0)); // 如果要替换有关值，括号中不加内容也可以
  // k多声明一位便于理解
  for (let i = 1; i <= n; i++) dp[i][1] = prefix[i] / i; // 0~i划分为1份时的平均值
  // 直接看划分为2～k时的不同最大值
  for (let j = 2; j <= k; j++) {
    // 基于要拆分为多少份，每次都处理到i位置划分为j份的最大值
    // 因为n个数最多被划分为n份，因此从可能划分为j份的地方开始遍历，即j，对于0～i一个元素一份可以划分为j份
    for (let i = j; i <= n; i++) {
      // 然后不断i向后走判断i处划分为j份的最大值
      let maxTmp = Number.MIN_SAFE_INTEGER;
      // 为了获取最大值，需要看在哪里拆分最值
      // 因为之前已经保证计算出了j-1时的最大值，所以只需在最小坐标到i之间选一个位置拆分，然后看j-1最大值+新的拆分方式，找出最大值即可
      for (let x = j - 1; x < i; x++) {
        // x为何等于j-1也是因为这里是在j-1的基础上多拆分一份，所以可能拆分为j-1份的地方就是j-1的脚标➗
        // 注意这里i和j会由于x的变化不断比较，所以需要一直判断x
        const valTmp = dp[x][j - 1] + (prefix[i] - prefix[x]) / (i - x);
        maxTmp = maxTmp < valTmp ? valTmp : maxTmp;
      }
      dp[i][j] = maxTmp; // 替换最大值
    }

  }
  return dp[n][k];
};

// 根据每次只需要j-1的情况，只需用一位数组即可
function largestSumOfAverages(nums: number[], k: number): number {
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0); // 记录前缀和，用于后续初始化dp数组
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i]; // 多初始化一位可以不用专门初始化第一位
  const dp = new Array(n + 1).fill(0); // k只是一个辅助参数，这里直接不记录，每个位置保存的值都相当于划分为j份时的最大值
  // 进而当j变大时，dp[i]保存的自然就是j-1时的最大平均值
  for (let i = 1; i <= n; i++) dp[i] = prefix[i] / i; // 1份时的初始化
  // 进而看划分为2～k时的不同最大值
  for (let j = 2; j <= k; j++) {
    // 虽然没有二维数组来记录，但是保存的值不变
    // 但因为之前有j-1作为标记来区分i之间的不同情况，为了防止遍历x时影响到dp的判断，要倒序
    for (let i = n; i >= j; i--) {
      // 然后不断i向后走判断i处划分为j份的最大值
      let maxTmp = Number.MIN_SAFE_INTEGER;
      // 因为这里x的范围是j-1到i，如果i从前往后会对保存的j-1的值产生影响
      for (let x = j - 1; x < i; x++) {
        const valTmp = dp[x] + (prefix[i] - prefix[x]) / (i - x);
        maxTmp = maxTmp < valTmp ? valTmp : maxTmp;
      }
      dp[i] = maxTmp; // 替换最大值
    }
  }
  // 此时j已经成为过k，所以n位置时0～n划分为k份的最大值
  return dp[n];
};